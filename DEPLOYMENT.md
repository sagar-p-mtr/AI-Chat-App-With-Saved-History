# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free) - https://vercel.com/signup
- Vercel CLI installed

## Quick Deployment Steps

### 1. Install Vercel CLI
```powershell
npm install -g vercel
```

### 2. Deploy Backend

```powershell
cd "C:\Assignments by companies\AI Chat App With Saved History\backend"
vercel
```

When prompted:
- Set up and deploy? → **Y**
- Which scope? → Choose your account
- Link to existing project? → **N**
- Project name? → **ai-chat-backend**
- Directory? → **./backend** (press Enter)
- Override settings? → **N**

After deployment:
- Copy the production URL (e.g., `https://ai-chat-backend.vercel.app`)
- In Vercel dashboard, go to your backend project → Settings → Environment Variables
- Add: `GROQ_API_KEY` = `your_groq_api_key_here`
- Redeploy: `vercel --prod`

### 3. Update Frontend with Backend URL

In `frontend/src/App.js`, change line 5:
```javascript
const API_URL = 'https://ai-chat-backend.vercel.app/api';
```
(Replace with YOUR actual backend URL)

### 4. Deploy Frontend

```powershell
cd "C:\Assignments by companies\AI Chat App With Saved History\frontend"
vercel
```

When prompted:
- Set up and deploy? → **Y**
- Which scope? → Choose your account
- Link to existing project? → **N**
- Project name? → **ai-chat-frontend**
- Directory? → **./frontend** (press Enter)
- Override settings? → **N**

For production:
```powershell
vercel --prod
```

### 5. Done!
Your app is now live at: `https://ai-chat-frontend.vercel.app`

## Alternative: Deploy via Vercel Website

1. Go to https://vercel.com/new
2. Import Git Repository (or upload folder)
3. Configure:
   - **Backend**: Set `GROQ_API_KEY` in Environment Variables
   - **Frontend**: Update API_URL in code first
4. Click "Deploy"

## Environment Variables for Backend
```
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

## Troubleshooting
- CORS errors? Backend `server.js` already has CORS enabled
- API not working? Check Environment Variables in Vercel dashboard
- Frontend not connecting? Verify API_URL in `App.js`
