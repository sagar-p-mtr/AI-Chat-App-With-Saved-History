# 🤖 AI Chat App with Saved History

A full-stack AI chat application powered by Groq API (Llama 3.3 70B) with persistent chat history, code syntax highlighting, and markdown rendering.

## ✨ Features

- 💬 **Real AI Conversations** - Powered by Groq API (Llama 3.3 70B)
- 🎨 **Syntax Highlighting** - Beautiful code formatting with react-syntax-highlighter
- 📝 **Markdown Support** - Rich text formatting in responses
- 💾 **Chat History** - Persistent conversation storage
- 🚀 **Fast & Free** - Groq API provides fast responses at no cost
- 🗑️ **Clear History** - Easy one-click history deletion
- 📱 **Responsive Design** - Beautiful UI with pink/white theme

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- Axios for API calls
- React Markdown with remark-gfm
- React Syntax Highlighter (VS Code Dark Plus theme)
- Custom CSS styling

### Backend
- Node.js + Express 4.18.2
- Groq API (Llama 3.3 70B model)
- In-memory storage
- CORS enabled

## 📋 Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **Groq API Key** (free) - [Get it here](https://console.groq.com)

## 🚀 Setup Instructions

### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

```

Create `.env` file in backend folder:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

**Get Your Groq API Key:**
1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### 2. Frontend Setup

```powershell
# Navigate to frontend directory (from project root)
cd ..\frontend

# Install dependencies
npm install
```

## 🎯 Running the Application

You'll need **two terminal windows**:

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

The app will automatically open in your browser at `http://localhost:3000`

## 📖 How It Works

1. **User sends a message** → Frontend sends POST request to backend
2. **Backend saves user message** → Stored in MongoDB
3. **Backend calls Groq AI** → Gets intelligent response using Llama 3.3 70B
4. **Backend saves message** → Stored in-memory (history persists during session)
5. **Frontend displays with formatting** → Markdown and syntax highlighting applied
6. **Page refresh** → Frontend fetches complete history from backend

## 📝 API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send message and get AI response
- `DELETE /api/chat/history` - Clear chat history

### POST `/api/chat/message`
Send a new message and get AI response
```json
{
  "content": "Your message here"
}
```

## 🎯 Usage

1. Open the app at http://localhost:3000
2. Type any question or request
3. Get intelligent AI responses with proper formatting
4. Chat history is automatically saved
5. Click 🗑️ to clear history

### Example Queries
- "Who is the Prime Minister of India?"
- "Write C code to add two numbers"
- "Explain quantum computing in simple terms"
- "What is the capital of France?"
- "Write Python code for bubble sort"

## 🔧 Troubleshooting

**AI Response Error:**
- Verify your Groq API key is correct in `.env`
- Check if you have internet connection
- Ensure you're using model `llama-3.3-70b-versatile`

**Port Already in Use:**
- Backend: Change `PORT` in backend `.env`
- Frontend: It will prompt to use a different port

**Code Not Highlighting:**
- Check that react-syntax-highlighter is installed
- Verify markdown rendering is enabled in App.js

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Vercel deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add `GROQ_API_KEY` environment variable
4. Deploy!

## 📦 Project Structure

```
AI Chat App With Saved History/
├── backend/
│   ├── server.js               # Express server
│   ├── routes/
│   │   └── chat.js            # Chat routes
│   ├── services/
│   │   └── aiService.js       # Groq API integration
│   ├── models/
│   │   └── Message.js         # Message schema
│   ├── package.json
│   ├── vercel.json            # Vercel deployment config
│   └── .env                   # Environment variables
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js             # Main React component
    │   ├── App.css            # Styling
    │   └── index.js           # Entry point
    ├── package.json
    └── vercel.json            # Vercel deployment config
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

**Frontend**
Update API URL in `src/App.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing fast, free AI inference
- [Meta](https://ai.meta.com) for Llama 3.3 70B model
- [React](https://react.dev) for the frontend framework
- [Express](https://expressjs.com) for the backend framework
- [React Markdown](https://github.com/remarkjs/react-markdown) for markdown rendering
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code formatting

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using Groq API and React  
✅ Save user messages  
✅ Call AI service  
✅ Save AI responses  
✅ Return updated conversation  

✅ AI Integration (Groq API)  
✅ AI generates replies  
✅ Replies are saved and displayed  

✅ Complete persistence  
✅ History survives page refresh  

## 📄 License

MIT

## 👨‍💻 Author

Created for Software & AI Assignment

---

**Need Help?** Open an issue or check the troubleshooting section above.
