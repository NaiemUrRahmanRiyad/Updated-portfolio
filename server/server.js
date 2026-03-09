require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// Security Middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000'],
  credentials: true
}));

// Rate Limiting for Contact
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many contact attempts, please try again later.'
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// ✅ ROOT ROUTE FIX
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Database Connection with Debug
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Debug: Check collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    console.log('⚠️  Server continuing without database...');
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', contactLimiter, require('./routes/contact'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', dbState: mongoose.connection.readyState });
});

// Serve Admin Panel
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin', req.params[0] || 'login.html'));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Server error!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Portfolio: http://localhost:${PORT}`);
  console.log(`🔐 Admin: http://localhost:${PORT}/admin/login.html`);
});