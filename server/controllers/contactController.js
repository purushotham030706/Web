const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// In-memory fallback if MongoDB is not running/configured
const memorySubmissions = [];

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and message.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const submissionData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      createdAt: new Date()
    };

    // If MongoDB is connected, persist to database
    if (mongoose.connection.readyState === 1) {
      const newContact = await Contact.create(submissionData);
      console.log(`[MongoDB] Contact saved: ${newContact._id} from ${newContact.email}`);
      return res.status(201).json({
        success: true,
        message: 'Message delivered and saved securely.',
        id: newContact._id
      });
    }

    // Graceful fallback to memory storage
    memorySubmissions.push(submissionData);
    console.log(`[Memory-Fallback] Contact received from ${email}. (MongoDB not connected)`);
    return res.status(200).json({
      success: true,
      message: 'Message received successfully (in-memory mode).',
      storedInMemory: true
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.'
    });
  }
};
