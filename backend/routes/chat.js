const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');
const { getAIResponse } = require('../services/aiService');

// In-memory fallback storage
let messagesMemory = [];
let messageIdCounter = 1;

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Get all messages (chat history)
router.get('/history', async (req, res) => {
  try {
    if (isMongoConnected()) {
      // Use MongoDB
      const messages = await Message.find().sort({ timestamp: 1 });
      res.json(messages);
    } else {
      // Use in-memory
      res.json(messagesMemory);
    }
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Send a message and get AI response
router.post('/message', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Message content is required' });
    }

    let userMessage, aiMessage;

    if (isMongoConnected()) {
      // Use MongoDB
      userMessage = await Message.create({
        role: 'user',
        content: content.trim()
      });

      // Get all messages for context
      const allMessages = await Message.find().sort({ timestamp: 1 });
      const aiResponseContent = await getAIResponse(allMessages);

      aiMessage = await Message.create({
        role: 'assistant',
        content: aiResponseContent
      });
    } else {
      // Use in-memory
      userMessage = {
        _id: messageIdCounter++,
        role: 'user',
        content: content.trim(),
        timestamp: new Date()
      };
      messagesMemory.push(userMessage);

      const aiResponseContent = await getAIResponse(messagesMemory);

      aiMessage = {
        _id: messageIdCounter++,
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date()
      };
      messagesMemory.push(aiMessage);
    }

    // Return both messages
    res.json({
      userMessage,
      aiMessage
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Clear chat history (optional utility endpoint)
router.delete('/history', async (req, res) => {
  try {
    if (isMongoConnected()) {
      // Clear MongoDB
      await Message.deleteMany({});
    } else {
      // Clear in-memory
      messagesMemory = [];
      messageIdCounter = 1;
    }
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = router;
