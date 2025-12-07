import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check API connection and fetch chat history on mount
  useEffect(() => {
    checkAPIConnection();
    fetchHistory();
  }, []);

  // Check if backend API is accessible
  const checkAPIConnection = async () => {
    try {
      await axios.get(`${API_URL.replace('/api', '')}/api/health`);
      console.log('✅ Backend API connected');
    } catch (err) {
      console.error('❌ Backend API not accessible:', err.message);
      setError('Cannot connect to backend. Please ensure the backend server is running on port 5000.');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/chat/history`);
      setMessages(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching history:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend server. Please start the backend on port 5000.');
      } else {
        setError('Failed to load chat history. Make sure the backend is running.');
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessageContent = inputMessage.trim();
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/chat/message`, {
        content: userMessageContent
      });

      // Add both user and AI messages to state
      setMessages(prev => [...prev, response.data.userMessage, response.data.aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend server. Please ensure it is running on port 5000.');
      } else {
        setError('Failed to send message. Please try again.');
      }
      // Restore the message in input if it failed
      setInputMessage(userMessageContent);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        await axios.delete(`${API_URL}/chat/history`);
        setMessages([]);
        setError(null);
      } catch (err) {
        console.error('Error clearing history:', err);
        setError('Failed to clear history.');
      }
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <h1>🤖 AI Chat Assistant</h1>
          <button onClick={clearHistory} className="clear-btn" title="Clear History">
            🗑️
          </button>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>👋 Hello!</h2>
              <p>Start a conversation with the AI assistant</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message ai-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="message-input"
          />
          <button type="submit" disabled={loading || !inputMessage.trim()} className="send-btn">
            {loading ? '⏳' : '📤'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
