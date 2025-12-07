# MongoDB Setup Guide for Chat Persistence

## Quick Setup (5 minutes)

Your app now supports MongoDB for persistent chat history! Follow these steps:

### Option 1: MongoDB Atlas (Free, Cloud, Recommended)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (free forever)

2. **Create Free Cluster**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select region closest to you
   - Click "Create"

3. **Create Database User**
   - Click "Database Access" → "Add New Database User"
   - Username: `aichat`
   - Password: Generate secure password (save it!)
   - Click "Add User"

4. **Allow Network Access**
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `aichat`

   Example:
   ```
   mongodb+srv://aichat:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aichat?retryWrites=true&w=majority
   ```

6. **Add to Vercel**
   - Go to Vercel → Your backend project
   - Settings → Environment Variables
   - Add new variable:
     - Key: `MONGODB_URI`
     - Value: (paste your connection string)
   - Redeploy

### Option 2: Local MongoDB (For Development)

1. Install MongoDB Community Edition
2. Start MongoDB: `mongod`
3. Add to `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/aichat
   ```

## Testing

After setup, check health endpoint:
```
https://your-backend.vercel.app/api/health
```

Should show:
```json
{
  "status": "OK",
  "storage": "MongoDB",
  "database": "connected"
}
```

## Benefits

✅ **Chat history persists forever**  
✅ **Survives server restarts**  
✅ **Free tier: 512MB storage**  
✅ **Shared across all users**  
✅ **Professional database solution**

## Fallback

If MongoDB is not configured, the app automatically falls back to in-memory storage (messages won't persist after server restart, but app still works!).
