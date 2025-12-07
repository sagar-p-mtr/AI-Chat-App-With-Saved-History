# AI Chat App - Quick Setup Script for Windows
# Run this script to set up both frontend and backend

Write-Host "🚀 Setting up AI Chat App..." -ForegroundColor Cyan
Write-Host ""

# Setup Backend
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
Set-Location -Path "backend"

if (Test-Path "package.json") {
    Write-Host "Installing backend dependencies..." -ForegroundColor Green
    npm install
    
    # Create .env if it doesn't exist
    if (-not (Test-Path ".env")) {
        Write-Host "Creating .env file..." -ForegroundColor Green
        Copy-Item ".env.example" ".env"
        Write-Host "⚠️  IMPORTANT: Edit backend\.env and add your GROQ_API_KEY" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Backend package.json not found!" -ForegroundColor Red
}

Set-Location -Path ".."

# Setup Frontend
Write-Host ""
Write-Host "📦 Setting up Frontend..." -ForegroundColor Yellow
Set-Location -Path "frontend"

if (Test-Path "package.json") {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Green
    npm install
} else {
    Write-Host "❌ Frontend package.json not found!" -ForegroundColor Red
}

Set-Location -Path ".."

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Get a free Groq API key from: https://console.groq.com" -ForegroundColor White
Write-Host "2. Edit backend\.env and add your GROQ_API_KEY" -ForegroundColor White
Write-Host "3. Make sure MongoDB is running (local or Atlas)" -ForegroundColor White
Write-Host ""
Write-Host "🎯 To Run the App:" -ForegroundColor Cyan
Write-Host "Terminal 1: cd backend && npm start" -ForegroundColor White
Write-Host "Terminal 2: cd frontend && npm start" -ForegroundColor White
Write-Host ""
