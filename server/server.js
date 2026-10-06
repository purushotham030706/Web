const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, uptime bots) or allowed web origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// Request body limit to prevent large payload attacks
app.use(express.json({ limit: '10kb' }));

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Optional MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✓ Successfully connected to MongoDB database.');
    })
    .catch((err) => {
      console.warn('! MongoDB connection failed. Running in graceful in-memory fallback mode:', err.message);
    });
} else {
  console.log('ℹ [WARN] No MONGODB_URI configured. Running with in-memory contact storage (messages will not persist across server restarts).');
}

app.listen(PORT, () => {
  console.log(`✓ API server listening on http://localhost:${PORT}`);
});
