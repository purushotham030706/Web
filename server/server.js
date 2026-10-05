const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Optional MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✓ Successfully connected to MongoDB database.');
    })
    .catch((err) => {
      console.warn('! MongoDB connection failed. Running in graceful memory fallback mode:', err.message);
    });
} else {
  console.log('ℹ No MONGO_URI provided in environment. Running with in-memory persistence.');
}

app.listen(PORT, () => {
  console.log(`✓ API server listening on http://localhost:${PORT}`);
});
