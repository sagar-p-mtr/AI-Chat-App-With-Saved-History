# Quick Test Script - Send Critical Questions to AI

Write-Host "🧠 AI Chat App - Critical Question Tester" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Check if backend is running
try {
    $health = Invoke-RestMethod -Uri http://localhost:5000/api/health -TimeoutSec 2
    Write-Host "✅ Backend Status: $($health.status) ($($health.storage))" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend not running! Start it first:" -ForegroundColor Red
    Write-Host "   cd backend && npm start" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Select a question to test:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. AI Ethics in Healthcare" -ForegroundColor White
Write-Host "2. Data Privacy & Surveillance" -ForegroundColor White
Write-Host "3. Climate Change Solutions" -ForegroundColor White
Write-Host "4. Universal Basic Income" -ForegroundColor White
Write-Host "5. Genetic Engineering Ethics" -ForegroundColor White
Write-Host "6. Free Will vs. Determinism" -ForegroundColor White
Write-Host "7. Future of Space Exploration" -ForegroundColor White
Write-Host "8. Quantum Computing Revolution" -ForegroundColor White
Write-Host "9. Social Media & Mental Health" -ForegroundColor White
Write-Host "10. The Meaning of Consciousness" -ForegroundColor White
Write-Host "11. Custom Question" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-11)"

$questions = @{
    "1" = "Can you provide a comprehensive analysis of the ethical implications of artificial intelligence in healthcare, particularly focusing on patient privacy, algorithmic bias in diagnosis, the potential displacement of healthcare workers, and how we can balance technological advancement with human-centered care? What regulatory frameworks should be implemented?"
    
    "2" = "In an increasingly connected world, how do we reconcile the benefits of data collection (personalized services, improved security, medical research) with fundamental privacy rights? Should there be a universal right to be forgotten, and how can we ensure that corporations and governments don't abuse their access to personal data?"
    
    "3" = "Given the urgency of climate change and the seemingly conflicting needs of economic development, energy security, and environmental protection, what comprehensive strategies should governments prioritize? How do we ensure climate action doesn't disproportionately burden developing nations or low-income communities?"
    
    "4" = "As automation threatens to displace millions of workers across various industries, could Universal Basic Income (UBI) be a viable solution? What are the economic implications of providing every citizen with a guaranteed income regardless of employment? Would it lead to inflation, reduce work incentive, or actually unleash human creativity?"
    
    "5" = "CRISPR and other gene-editing technologies offer unprecedented ability to eliminate genetic diseases, but also raise concerns about designer babies, eugenics, and unforeseen consequences. Where should we draw ethical lines? Should parents be allowed to select traits like intelligence, athletic ability, or appearance?"
    
    "6" = "Modern neuroscience suggests that our decisions may be determined by brain chemistry, genetics, and environment before we consciously choose them. If free will is an illusion, what are the implications for moral responsibility, criminal justice, personal achievement, and the meaning we assign to our lives?"
    
    "7" = "What are the most promising frontiers in space exploration, and should humanity prioritize Mars colonization, asteroid mining, or deep space research? How do we address the ethical concerns of space militarization, planetary protection, and the commercialization of celestial bodies? What role should international cooperation play?"
    
    "8" = "Quantum computing promises to revolutionize computing power, potentially breaking current encryption standards, accelerating drug discovery, and solving complex optimization problems. What are the realistic timelines for practical quantum computers? How should society prepare for the cybersecurity implications, and what new opportunities will emerge?"
    
    "9" = "How has social media fundamentally changed human psychology, relationships, and society? What's the connection between increased social media use and rising rates of anxiety, depression, and loneliness, especially among young people? Should social media platforms be regulated like public utilities, and what responsibility do they have for mental health outcomes?"
    
    "10" = "What is consciousness? Is it purely an emergent property of complex neural networks, or something more fundamental to the universe? Could artificial intelligence ever be truly conscious? How would we even know? What does consciousness tell us about the nature of reality, and why does subjective experience exist at all?"
}

if ($choice -eq "11") {
    $question = Read-Host "`nEnter your custom question"
} else {
    $question = $questions[$choice]
}

if ([string]::IsNullOrWhiteSpace($question)) {
    Write-Host "❌ Invalid choice!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "📤 Sending question to AI..." -ForegroundColor Cyan
Write-Host ""

try {
    $body = @{ content = $question } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri http://localhost:5000/api/chat/message -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Blue
    Write-Host "║                    YOUR QUESTION                      ║" -ForegroundColor Blue
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Blue
    Write-Host $response.userMessage.content -ForegroundColor White
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                    AI RESPONSE                        ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host $response.aiMessage.content -ForegroundColor White
    Write-Host ""
    Write-Host "✅ Message sent successfully!" -ForegroundColor Green
    Write-Host "🌐 Check http://localhost:3000 to see it in the UI" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
