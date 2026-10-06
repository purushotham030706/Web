const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// In-memory fallback if MongoDB is not connected
const memorySubmissions = [];

// Lightweight in-memory rate limiter: max 5 requests per 15 minutes per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map();

// Periodic cleanup of stale rate limiter entries (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipRequestHistory.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      ipRequestHistory.delete(ip);
    } else {
      ipRequestHistory.set(ip, validTimestamps);
    }
  }
}, 10 * 60 * 1000).unref();

exports.submitContact = async (req, res) => {
  try {
    const clientIp = (
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown'
    ).trim();

    // 1. Rate Limiting Check
    const now = Date.now();
    const timestamps = (ipRequestHistory.get(clientIp) || []).filter(
      t => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      console.warn(`[RateLimit] Contact submission limit reached for IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a few minutes before trying again.'
      });
    }

    timestamps.push(now);
    ipRequestHistory.set(clientIp, timestamps);

    const { name, email, message, website } = req.body || {};

    // 2. Honeypot check: 'website' field must be empty for legitimate humans
    if (website && typeof website === 'string' && website.trim() !== '') {
      console.warn(`[Spam-Blocked] Honeypot triggered by IP: ${clientIp}`);
      // Return standard success to avoid alerting spambots
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully.'
      });
    }

    // 3. Strict Input Validation & Normalization
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Unable to send message. Missing or invalid form fields.'
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Name length: 1 - 100 chars
    if (trimmedName.length < 1 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Unable to send message. Name must be between 1 and 100 characters.'
      });
    }

    // Email format & length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length > 100 || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Unable to send message. Please provide a valid email address.'
      });
    }

    // Message length: 10 - 3000 chars
    if (trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      return res.status(400).json({
        success: false,
        message: 'Unable to send message. Message must be between 10 and 3000 characters.'
      });
    }

    const submissionData = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      ip: clientIp,
      createdAt: new Date()
    };

    // 4. Persistence: MongoDB or In-Memory fallback
    if (mongoose.connection.readyState === 1) {
      try {
        const savedDoc = await Contact.create(submissionData);
        console.log(`[MongoDB] Contact saved: ID ${savedDoc._id} from ${savedDoc.email}`);
        return res.status(201).json({
          success: true,
          message: 'Message sent successfully.'
        });
      } catch (dbErr) {
        console.error('[MongoDB Error] Failed to write contact document:', dbErr.message);
        // Fall back gracefully to memory
        memorySubmissions.push(submissionData);
        console.warn(`[WARN] MongoDB unavailable — using in-memory contact storage (messages will not persist across restarts). Contact stored from: ${trimmedEmail}`);
        return res.status(200).json({
          success: true,
          message: 'Message sent successfully.'
        });
      }
    }

    // Explicit log for fallback mode
    memorySubmissions.push(submissionData);
    console.warn(`[WARN] MongoDB unavailable — using in-memory contact storage (messages will not persist across restarts). Contact received from: ${trimmedEmail}`);
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.'
    });

  } catch (error) {
    console.error('[Error] Unexpected error in submitContact:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send message.'
    });
  }
};
