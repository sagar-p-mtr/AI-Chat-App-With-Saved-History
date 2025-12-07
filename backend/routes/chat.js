const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../services/aiService');

// In-memory storage (replaces MongoDB)
let messages = [];
let messageIdCounter = 1;

// Get all messages (chat history)
router.get('/history', (req, res) => {
  try {
    res.json(messages);
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

    // Create user message
    const userMessage = {
      _id: messageIdCounter++,
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    messages.push(userMessage);

    // Get AI response
    const aiResponseContent = await getAIResponse(messages);

    // Create AI message
    const aiMessage = {
      _id: messageIdCounter++,
      role: 'assistant',
      content: aiResponseContent,
      timestamp: new Date()
    };
    messages.push(aiMessage);

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
router.delete('/history', (req, res) => {
  try {
    messages = [];
    messageIdCounter = 1;
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = router;
