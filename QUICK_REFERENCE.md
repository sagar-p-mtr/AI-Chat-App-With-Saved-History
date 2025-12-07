# 📚 Quick Reference - Testing Your AI Chat App

## 🎯 Three Ways to Test Critical Questions

### 1️⃣ Use the Web UI (Easiest)
1. Open http://localhost:3000
2. Copy a question from `CRITICAL_QUESTIONS.md`
3. Paste and send
4. Watch the AI respond in real-time

### 2️⃣ Use the Test Script (Interactive)
```powershell
.\test-questions.ps1
```
- Select from preset questions
- Or enter your own custom question
- See formatted results in terminal

### 3️⃣ Use PowerShell Directly (For Developers)
```powershell
$body = @{ content = "Your question here?" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:5000/api/chat/message -Method Post -Body $body -ContentType "application/json"
$response.aiMessage.content
```

---

## 🧪 Quick Tests

### Test 1: Simple Greeting
```
Hi! How are you?
```
**Expected:** Friendly greeting response

### Test 2: Short Question
```
What can you do?
```
**Expected:** Description of capabilities

### Test 3: Long Complex Question (150+ chars)
```
Can you provide a comprehensive analysis of the ethical implications of artificial intelligence in healthcare, particularly focusing on patient privacy, algorithmic bias in diagnosis, and the potential displacement of healthcare workers?
```
**Expected:** Structured multi-point response with 5 key considerations

### Test 4: Thank You
```
Thank you for your help!
```
**Expected:** Polite acknowledgment

---

## 📊 What to Check

✅ **Response Time** - Should be instant (in-memory storage)  
✅ **Message Storage** - Refresh page, history should persist  
✅ **Error Handling** - Try empty message (should reject)  
✅ **UI Updates** - Auto-scroll, typing indicator  
✅ **Timestamps** - Each message shows time  
✅ **Clear History** - Button removes all messages  

---

## 🔧 Troubleshooting

### Backend Not Responding?
```powershell
cd backend
npm start
```

### Frontend Not Loading?
```powershell
cd frontend
npm start
```

### Port Already in Use?
```powershell
# Kill process on port 5000
$p = Get-NetTCPConnection -LocalPort 5000 | Select -ExpandProperty OwningProcess
Stop-Process -Id $p -Force
```

### Check Server Status
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/health
```

---

## 📝 Sample Critical Questions (Quick Copy)

**Short Version (for quick testing):**
```
How should AI be regulated in healthcare to protect patient privacy while enabling innovation?
```

**Medium Version:**
```
In an increasingly connected world, how do we reconcile the benefits of data collection with fundamental privacy rights? Should there be a universal right to be forgotten?
```

**Long Version (tests handling of complex queries):**
```
Given the urgency of climate change and the seemingly conflicting needs of economic development, energy security, and environmental protection, what comprehensive strategies should governments prioritize? How do we ensure climate action doesn't disproportionately burden developing nations or low-income communities? Is carbon taxation effective, and what alternatives exist for achieving net-zero emissions by 2050?
```

---

## 🎨 Response Quality Indicators

### ✅ Good Response:
- Acknowledges complexity
- Provides structured thinking
- Mentions multiple perspectives
- Invites further discussion
- Shows context awareness

### ⚠️ Basic Response:
- Generic or too brief
- Doesn't address specifics
- No depth or nuance

### 💡 With Real AI (Groq/OpenAI):
- Detailed analysis
- Specific examples
- Expert-level reasoning
- Citation of concepts
- Actionable insights

---

## 🚀 Upgrade to Real AI

To get sophisticated responses:

1. **Get API Key** (free): https://console.groq.com
2. **Edit** `backend\.env`
3. **Replace** `your_groq_api_key_here` with actual key
4. **Restart** backend server
5. **Test** same questions again - huge difference!

---

## 📁 Files in This Project

```
📂 Project Root
├── 📄 README.md              → Full documentation
├── 📄 QUICK_START.md         → How to run (no setup!)
├── 📄 CRITICAL_QUESTIONS.md  → 21 deep questions
├── 📄 QUICK_REFERENCE.md     → This file
├── 📜 test-questions.ps1     → Interactive test script
│
├── 📂 backend/
│   ├── server.js             → Express server
│   ├── routes/chat.js        → API endpoints
│   ├── services/aiService.js → AI logic (mock + Groq)
│   ├── package.json          → Dependencies
│   └── .env                  → Configuration
│
└── 📂 frontend/
    ├── src/App.js            → React UI
    ├── src/App.css           → Styles
    └── package.json          → Dependencies
```

---

## ⚡ Quick Commands

### Start Everything:
```powershell
# Terminal 1
cd backend; npm start

# Terminal 2  
cd frontend; npm start
```

### Test One Question:
```powershell
.\test-questions.ps1
```

### View Chat History:
```powershell
Invoke-RestMethod http://localhost:5000/api/chat/history
```

### Clear All Messages:
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/chat/history -Method Delete
```

---

## 🎯 Assignment Checklist

Your app demonstrates:

✅ **Frontend (React)**
- Chat UI with input and send button
- Message display area
- Loads history on page refresh

✅ **Backend (Node.js/Express)**  
- Accepts and stores user messages
- Calls AI service for responses
- Stores and returns AI replies
- Provides history endpoint

✅ **AI Integration**
- Mock AI (works immediately)
- Real AI support (with API key)
- Context-aware responses

✅ **Data Persistence**
- Messages stored (in-memory)
- History survives page refresh
- Can be cleared on demand

---

**🎉 Your app is complete and fully functional!**

Test it with the critical questions to showcase its capabilities!
