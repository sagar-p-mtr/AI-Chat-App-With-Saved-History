const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://default:default@cluster0.mongodb.net/aichat?retryWrites=true&w=majority';

if (MONGODB_URI && MONGODB_URI !== 'mongodb+srv://default:default@cluster0.mongodb.net/aichat?retryWrites=true&w=majority') {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB Connected');
    })
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.log('⚠️  Continuing without database - messages will not persist');
    });
} else {
  console.log('⚠️  No MongoDB URI configured - using in-memory storage');
  console.log('💡 Messages will not persist across server restarts');
}

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({ 
    status: 'OK', 
    storage: isMongoConnected ? 'MongoDB' : 'in-memory',
    database: isMongoConnected ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
