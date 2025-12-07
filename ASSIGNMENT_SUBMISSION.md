# 🎯 Software & AI Assignment Submission
## AI Chat App With Saved History

**Submitted by:** Sagar P  
**Date:** December 7, 2025  
**Position:** Software & AI Internship

---

## ✅ 1. LIVE HOSTED WEB APP (Mandatory)

### 🌐 Live Application URLs:

**Frontend (User Interface):**
- URL: `https://ai-chat-app-with-saved-history-zqzv.vercel.app`
- Framework: React 18.2.0
- Hosting: Vercel

**Backend (API Server):**
- URL: `https://sagarp-ai-chat-backend.vercel.app`
- Technology: Node.js + Express
- Hosting: Vercel Serverless
- Health Check: `https://sagarp-ai-chat-backend.vercel.app/api/health`

### ✅ Testing the Live App:
1. Visit the frontend URL
2. Type any message and send
3. AI responds using **Groq API (Llama 3.3 70B)**
4. Refresh the page → Chat history persists
5. All messages are stored and retrieved from backend

---

## ✅ 2. SCREENSHOTS (Mandatory)

### 📸 Screenshot Locations:
All screenshots demonstrating the following are available:

1. **Chat Interface with User + AI Replies**
   - Shows conversation between user and AI
   - Beautiful UI with pink user messages and white AI messages
   - Markdown rendering with syntax highlighting for code

2. **Chat History Persists After Refresh**
   - Messages remain after page reload
   - Full conversation history maintained

3. **Backend Running**
   - Terminal logs showing backend server
   - API endpoints responding
   - Health check returning: `{"status":"OK","storage":"in-memory"}`

4. **Storage Showing Saved Messages**
   - Backend maintains in-memory storage
   - Messages stored with role (user/assistant) and content
   - Conversation history accessible via API

---

## ✅ 3. GITHUB REPOSITORY (Optional - Provided)

**Repository URL:** https://github.com/sagar-p-mtr/AI-Chat-App-With-Saved-History

### Repository Structure:
```
AI-Chat-App-With-Saved-History/
├── backend/
│   ├── server.js               # Express server
│   ├── routes/chat.js          # Chat API endpoints
│   ├── services/aiService.js   # Groq AI integration
│   ├── models/Message.js       # Message schema
│   └── vercel.json            # Backend deployment config
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Styling
│   │   └── index.js           # Entry point
│   └── vercel.json            # Frontend deployment config
│
├── README.md                   # Complete documentation
├── DEPLOYMENT.md               # Deployment guide
└── .gitignore                 # Git exclusions
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### 1️⃣ Frontend Requirements ✅

**Framework:** React 18.2.0 (as preferred)

**Features Implemented:**
- ✅ **Chat-style UI** with modern design
- ✅ **Input box** for typing messages
- ✅ **Send button** with loading states
- ✅ **Message display area** showing user and AI messages
- ✅ **Auto-scroll** to latest message
- ✅ **Markdown rendering** with react-markdown
- ✅ **Syntax highlighting** for code blocks (react-syntax-highlighter)
- ✅ **On page load:** Fetches and displays existing chat history
- ✅ **Error handling:** Shows connection errors gracefully
- ✅ **Health check:** Verifies backend connectivity on load

**Key Features:**
- Beautiful pink/white color scheme
- Responsive design
- Real-time updates
- Clear history button (trash icon)
- Typing indicators
- Network error detection

---

### 2️⃣ Backend Requirements ✅

**Technology:** Node.js + Express 4.18.2

**Storage:** In-memory storage (easily extendable to MongoDB)

**Endpoints Implemented:**

1. **POST `/api/chat/message`**
   - Accepts user message
   - Saves message to storage
   - Calls Groq AI API
   - Saves AI reply
   - Returns both messages

2. **GET `/api/chat/history`**
   - Fetches full stored chat history
   - Returns all messages in chronological order

3. **DELETE `/api/chat/history`**
   - Clears all chat history

4. **GET `/api/health`**
   - Health check endpoint
   - Returns server status

**Features:**
- ✅ Message persistence across sessions
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling and logging
- ✅ Serverless deployment on Vercel

---

### 3️⃣ AI Integration Requirements ✅

**AI Provider:** Groq (free, fast, reliable)  
**Model:** Llama 3.3 70B Versatile  
**API:** Groq Cloud API

**How it Works:**
1. User sends a message
2. Backend receives and stores user message
3. Backend calls Groq AI API with conversation context
4. AI generates intelligent reply
5. Backend stores AI reply
6. Frontend displays both messages with formatting

**AI Capabilities:**
- ✅ Natural language understanding
- ✅ Code generation (C, Python, JavaScript, etc.)
- ✅ Factual knowledge (world leaders, capitals, inventors, etc.)
- ✅ Explanations and reasoning
- ✅ Context-aware responses
- ✅ Markdown formatted replies
- ✅ Multi-turn conversations

**Example Queries Handled:**
- "Who is the Prime Minister of India?" → Narendra Modi
- "Write C code to add two numbers" → Generates actual C code
- "Explain quantum computing" → Detailed explanation
- "What is the capital of France?" → Paris

---

## 🎨 ADDITIONAL FEATURES (Beyond Requirements)

### Enhanced User Experience:
1. **Markdown Rendering**
   - Rich text formatting in AI responses
   - Headers, lists, bold, italic support

2. **Code Syntax Highlighting**
   - Beautiful VS Code Dark Plus theme
   - Supports all programming languages
   - Copy-friendly code blocks

3. **Health Monitoring**
   - Automatic backend connectivity check
   - Clear error messages for connection issues
   - Network error detection

4. **Message Management**
   - One-click history clearing
   - Persistent storage during session
   - Fast message loading

5. **Professional UI/UX**
   - Clean, modern interface
   - Pink user messages, white AI messages
   - Smooth animations
   - Responsive design

---

## 📊 TESTING PROOF

### ✅ Backend API Testing:

```bash
# Health Check
curl https://sagarp-ai-chat-backend.vercel.app/api/health
Response: {"status":"OK","storage":"in-memory"}

# Chat History
curl https://sagarp-ai-chat-backend.vercel.app/api/chat/history
Response: [Array of stored messages]

# Send Message (POST)
curl -X POST https://sagarp-ai-chat-backend.vercel.app/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello AI"}'
Response: {userMessage, aiMessage}
```

### ✅ Frontend Testing:

1. **Initial Load:**
   - Page loads successfully
   - Backend connection verified
   - Empty state displayed

2. **Send Message:**
   - User types and sends message
   - Message appears instantly
   - AI responds with intelligent reply
   - Both messages stored

3. **Page Refresh:**
   - All messages persist
   - Chat history fully restored
   - No data loss

4. **Clear History:**
   - Trash icon clears all messages
   - Confirmation of deletion
   - Backend storage cleared

---

## 🚀 DEPLOYMENT DETAILS

### Frontend Deployment (Vercel):
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Environment Variables:** 
  - `REACT_APP_API_URL=https://sagarp-ai-chat-backend.vercel.app/api`
- **Status:** ✅ Live and Running

### Backend Deployment (Vercel):
- **Platform:** Vercel Serverless
- **Runtime:** Node.js
- **Environment Variables:**
  - `GROQ_API_KEY` (configured securely)
  - `PORT=5000`
- **Status:** ✅ Live and Running

### Deployment Configuration:
- Both frontend and backend deployed separately
- Environment variables configured in Vercel dashboard
- Automatic deployments from GitHub main branch
- HTTPS enabled by default

---

## 📦 TECHNOLOGIES USED

### Frontend:
- React 18.2.0
- Axios (HTTP client)
- React Markdown 10.1.0
- React Syntax Highlighter 16.1.0
- Remark GFM 4.0.1 (GitHub Flavored Markdown)
- CSS3 (custom styling)

### Backend:
- Node.js (runtime)
- Express 4.18.2 (web framework)
- Groq API (AI integration)
- Axios (API calls)
- dotenv (environment variables)
- CORS (cross-origin support)

### Deployment & DevOps:
- Vercel (hosting)
- GitHub (version control)
- Git (source control)

---

## 💡 KEY ACHIEVEMENTS

✅ **All Requirements Met:**
- Complete chat interface with persistence
- Backend with storage and AI integration
- Live hosted application (frontend + backend)
- Screenshots provided
- GitHub repository shared

✅ **Production-Ready Features:**
- Error handling and user feedback
- Loading states and animations
- Health monitoring
- Secure API key management
- Clean code architecture

✅ **Enhanced Features:**
- Markdown rendering
- Syntax highlighting
- Code generation capability
- Factual knowledge base
- Beautiful, professional UI

---

## 🎯 CONCLUSION

This assignment demonstrates:

1. **Full-stack development skills** - React frontend + Node.js backend
2. **AI integration expertise** - Groq API with Llama 3.3 70B
3. **Deployment experience** - Vercel serverless hosting
4. **Software engineering practices** - Clean code, error handling, documentation
5. **Problem-solving ability** - Enhanced features beyond requirements

The application is **fully functional, live, and ready for testing.**

---

## 📞 CONTACT & LINKS

**Live Application:** https://ai-chat-app-with-saved-history-zqzv.vercel.app  
**GitHub Repository:** https://github.com/sagar-p-mtr/AI-Chat-App-With-Saved-History  
**Backend API:** https://sagarp-ai-chat-backend.vercel.app  

**Submitted by:** Sagar P  
**Date:** December 7, 2025  
**Position:** Software & AI Internship

---

*Thank you for reviewing my submission. I look forward to discussing the implementation in the interview!* 🚀
