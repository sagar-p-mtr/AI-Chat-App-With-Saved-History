const axios = require('axios');

/**
 * Get AI response - tries Groq API first, falls back to mock AI
 */
async function getAIResponse(conversationHistory) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  // If API key is configured and valid, try Groq
  if (GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here') {
    try {
      // Add system prompt to ensure English responses
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Always respond in English, regardless of the language used in the question. Provide clear, accurate, and well-formatted answers.'
        },
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2048
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('❌ Groq API Error:', error.response?.data || error.message);
      console.log('🔄 Falling back to mock AI...');
    }
  }

  // Fallback: Intelligent mock AI responses
  return getMockAIResponse(conversationHistory);
}

/**
 * Mock AI that provides intelligent responses without API
 */
function getMockAIResponse(conversationHistory) {
  const lastMessage = conversationHistory[conversationHistory.length - 1];
  const userMessage = lastMessage.content.toLowerCase();

  // ===== CODE GENERATION PATTERNS =====
  
  // C/C++ code requests - more flexible matching
  if (/(give|write|create|show|provide|code|program).*(c\b|c code|c program|c\+\+)/i.test(userMessage) || 
      /c (code|program).*(for|to|of)/i.test(userMessage)) {
    if (/add|sum|addition|\+|plus|two.*number|2.*number/i.test(userMessage)) {
      return `Here's a **C program to add two numbers**:

\`\`\`c
#include <stdio.h>

int main() {
    int num1, num2, sum;
    
    // Input two numbers
    printf("Enter first number: ");
    scanf("%d", &num1);
    
    printf("Enter second number: ");
    scanf("%d", &num2);
    
    // Calculate sum
    sum = num1 + num2;
    
    // Display result
    printf("Sum = %d\\n", sum);
    
    return 0;
}
\`\`\`

**Explanation:**
• **Variables**: \`num1\`, \`num2\` store input, \`sum\` stores result
• **scanf()**: Takes user input
• **printf()**: Displays output
• **Addition**: \`sum = num1 + num2\`

**How to Run:**
1. Save as \`add.c\`
2. Compile: \`gcc add.c -o add\`
3. Run: \`./add\` (Linux/Mac) or \`add.exe\` (Windows)

Want me to show you more examples?`;
    }
  }

  // Python code requests - more flexible matching
  if (/(give|write|create|show|provide|code|program).*(python|py\b)/i.test(userMessage) ||
      /python (code|program).*(for|to|of)/i.test(userMessage)) {
    if (/add|sum|addition|\+|plus|two.*number|2.*number/i.test(userMessage)) {
      return `Here's a **Python program to add two numbers**:

\`\`\`python
# Method 1: Simple addition
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
sum = num1 + num2
print(f"Sum = {sum}")
\`\`\`

**Alternative with function:**
\`\`\`python
def add_numbers(a, b):
    return a + b

# Get user input
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# Calculate and display
result = add_numbers(num1, num2)
print(f"Sum of {num1} and {num2} = {result}")
\`\`\`

**Features:**
• \`float()\` allows decimal numbers
• \`input()\` gets user input
• f-strings for formatted output
• Function approach for reusability

**Run it:** Save as \`add.py\` and run \`python add.py\``;
    }
  }

  // JavaScript code requests - more flexible matching
  if (/(give|write|create|show|provide|code|program).*(javascript|js\b|node)/i.test(userMessage) ||
      /(javascript|js) (code|program).*(for|to|of)/i.test(userMessage)) {
    if (/add|sum|addition|\+|plus|two.*number|2.*number/i.test(userMessage)) {
      return `Here's **JavaScript code to add two numbers**:

**For Node.js (Console):**
\`\`\`javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter first number: ', (num1) => {
    rl.question('Enter second number: ', (num2) => {
        const sum = parseFloat(num1) + parseFloat(num2);
        console.log(\`Sum = \${sum}\`);
        rl.close();
    });
});
\`\`\`

**For Browser (HTML):**
\`\`\`html
<!DOCTYPE html>
<html>
<body>
    <h2>Add Two Numbers</h2>
    <input type="number" id="num1" placeholder="First number">
    <input type="number" id="num2" placeholder="Second number">
    <button onclick="addNumbers()">Calculate</button>
    <p id="result"></p>

    <script>
        function addNumbers() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const sum = num1 + num2;
            document.getElementById('result').textContent = 'Sum = ' + sum;
        }
    </script>
</body>
</html>
\`\`\`

Choose the version you need!`;
    }
  }

  // General code request without language specified - broadest match
  if (/(give|write|create|show|code|program).*(code|program)/i.test(userMessage) && 
      /add|sum|\+|plus|two.*number|2.*number/i.test(userMessage)) {
    return `I can provide code in multiple languages! Here's **C code** to add two numbers:

\`\`\`c
#include <stdio.h>

int main() {
    int num1, num2, sum;
    
    printf("Enter first number: ");
    scanf("%d", &num1);
    
    printf("Enter second number: ");
    scanf("%d", &num2);
    
    sum = num1 + num2;
    
    printf("Sum = %d\\n", sum);
    
    return 0;
}
\`\`\`

Would you like this in **Python**, **JavaScript**, **Java**, or another language? Just ask!`;
  }

  // ===== FACTUAL QUESTIONS PATTERNS =====
  
  // World Leaders & Politics - flexible matching with "current", "present", etc.
  if (/who is (the )?(current |present |now )?(<br>prime minister|president|leader|pm|pradhan mantri).*(india|bharat)/i.test(userMessage) ||
      /(current|present) (prime minister|pm|president).*(india|bharat)/i.test(userMessage)) {
    return `**Prime Minister of India (as of December 2025):**

🇮🇳 **Narendra Modi**

**Key Information:**
• **Position**: 14th Prime Minister of India
• **Party**: Bharatiya Janata Party (BJP)
• **First Term**: May 26, 2014
• **Current Term**: Third consecutive term (won 2024 elections)
• **Previous Role**: Chief Minister of Gujarat (2001-2014)

**Notable Initiatives:**
• Digital India campaign
• Make in India program
• Swachh Bharat (Clean India) Mission
• Jan Dhan Yojana (financial inclusion)
• COVID-19 vaccination drive (one of world's largest)

**Background:**
Born in Vadnagar, Gujarat, he rose from humble beginnings to become one of India's most prominent political figures. Known for strong economic reforms and digital governance initiatives.

Would you like to know more about Indian politics or government structure?`;
  }

  // Capital cities - flexible patterns
  if (/(what is|tell me|which is|what's).*(capital).*(india|france|japan|usa|uk|germany|china)/i.test(userMessage) ||
      /(capital|capital city).*(of|in).*(india|france|japan|usa|uk|germany|china)/i.test(userMessage)) {
    const capitals = {
      india: "**New Delhi** - The capital of India, known for India Gate, Red Fort, and Parliament House",
      france: "**Paris** - The capital of France, famous for the Eiffel Tower, Louvre Museum, and Notre-Dame",
      japan: "**Tokyo** - The capital of Japan, one of the world's largest metropolitan areas",
      usa: "**Washington, D.C.** - The capital of the United States, home to the White House and Capitol",
      uk: "**London** - The capital of the United Kingdom, known for Big Ben, Buckingham Palace",
      germany: "**Berlin** - The capital of Germany, famous for Brandenburg Gate and rich history",
      china: "**Beijing** - The capital of China, home to the Forbidden City and Tiananmen Square"
    };
    
    for (const [country, answer] of Object.entries(capitals)) {
      if (userMessage.includes(country)) {
        return answer + "\n\nWould you like to know more about this city or country?";
      }
    }
  }

  // Population questions
  if (/(population|how many people).*(world|earth|india|china|usa)/i.test(userMessage)) {
    if (/world|earth/i.test(userMessage)) {
      return `**World Population (2025):** Approximately **8.1 billion people**

**Key Facts:**
• Most populous countries: India, China, USA, Indonesia, Pakistan
• Population growth rate: ~1% per year (slowing)
• Urban population: Over 56% live in cities
• Life expectancy: Global average ~73 years

**Projections:**
• Expected to reach 9.7 billion by 2050
• Peak around 10.4 billion in 2080s

Would you like to know about specific countries or demographics?`;
    }
  }

  // General knowledge questions
  if (/(who invented|who created|who discovered).*(computer|internet|telephone|electricity|gravity)/i.test(userMessage)) {
    const inventors = {
      computer: "**Charles Babbage** is considered the 'father of the computer' for designing the Analytical Engine in 1837. Modern computers were developed by many, including **Alan Turing** (theory) and **John von Neumann** (architecture).",
      internet: "The **internet** was developed through ARPANET by **Vint Cerf** and **Bob Kahn** who created TCP/IP protocols in the 1970s. **Tim Berners-Lee** invented the World Wide Web in 1989.",
      telephone: "**Alexander Graham Bell** patented the telephone in 1876, though **Elisha Gray** filed a similar patent the same day.",
      electricity: "**Electricity** wasn't invented but discovered. **Benjamin Franklin** proved lightning is electrical (1752), **Alessandro Volta** created the first battery (1800), **Michael Faraday** discovered electromagnetic induction (1831).",
      gravity: "**Isaac Newton** formulated the law of universal gravitation in 1687. **Albert Einstein** later refined it with General Relativity (1915)."
    };
    
    for (const [topic, answer] of Object.entries(inventors)) {
      if (userMessage.includes(topic)) {
        return answer + "\n\nWant to learn more about this invention or other discoveries?";
      }
    }
  }

  // Simple "who is" questions
  if (/who (is|was) (elon musk|bill gates|steve jobs|mark zuckerberg|jeff bezos)/i.test(userMessage)) {
    const people = {
      "elon musk": "**Elon Musk** - CEO of Tesla, SpaceX, and owner of X (formerly Twitter). Known for electric vehicles, space exploration, and ambitious technology projects like Neuralink and The Boring Company.",
      "bill gates": "**Bill Gates** - Co-founder of Microsoft, philanthropist through Bill & Melinda Gates Foundation. One of the world's wealthiest people, focused on global health and education.",
      "steve jobs": "**Steve Jobs** (1955-2011) - Co-founder of Apple Inc. Revolutionary technology leader who created iPhone, iPad, Mac. Known for innovation and product design excellence.",
      "mark zuckerberg": "**Mark Zuckerberg** - Co-founder and CEO of Meta (Facebook). Created Facebook in 2004, now leading virtual reality and metaverse initiatives.",
      "jeff bezos": "**Jeff Bezos** - Founder of Amazon, owner of Blue Origin space company and Washington Post. Built one of world's largest e-commerce platforms."
    };
    
    for (const [name, answer] of Object.entries(people)) {
      if (userMessage.includes(name)) {
        return answer + "\n\nWould you like to know more?";
      }
    }
  }

  // Topic-based responses with keyword matching
  const topicResponses = {
    // Programming & Technology
    programming: {
      keywords: ['python', 'javascript', 'java', 'code', 'programming', 'function', 'variable', 'algorithm', 'debug', 'syntax', 'define python', 'what is python'],
      responses: [
        "**Python** is a high-level, interpreted programming language created by Guido van Rossum in 1991. Here's what makes it special:\n\n🎯 **Key Features:**\n• **Easy to Learn**: Clear, readable syntax that resembles English\n• **Versatile**: Used for web dev, data science, AI, automation, scripting\n• **Huge Ecosystem**: 300,000+ packages on PyPI (NumPy, Pandas, Django, Flask, TensorFlow)\n• **Interpreted**: No compilation needed - write and run immediately\n• **Cross-platform**: Runs on Windows, Mac, Linux, and more\n\n💡 **Popular Uses:**\n1. **Data Science & AI**: NumPy, Pandas, scikit-learn, TensorFlow, PyTorch\n2. **Web Development**: Django, Flask, FastAPI\n3. **Automation**: Scripts for repetitive tasks\n4. **Scientific Computing**: Research, simulations, analysis\n5. **Game Development**: Pygame\n\n📚 **Why Beginners Love It:**\n• Simple syntax: `print('Hello World')`\n• No semicolons or curly braces\n• Dynamic typing (no need to declare variable types)\n• Extensive documentation and community support\n\n🚀 **Career Opportunities:**\nPython developers are in high demand for roles in:\n- Data Scientist\n- Machine Learning Engineer\n- Backend Developer\n- DevOps Engineer\n- Automation Engineer\n\nWant to learn Python? Start with variables, loops, functions, and build small projects!",
        "**Programming languages** each have their strengths:\n\n• **Python**: Great for data science, AI, web development (Django/Flask), and beginners. Known for readable syntax and vast libraries.\n\n• **JavaScript**: Essential for web development (frontend & backend with Node.js). Runs in browsers and has frameworks like React, Vue, Angular.\n\n• **Java**: Enterprise applications, Android apps, and large-scale systems. Strong typing and object-oriented design.\n\nEach language excels in different domains. What type of project are you interested in?",
        "When learning programming, focus on:\n\n1. **Fundamentals**: Variables, loops, conditionals, functions\n2. **Problem-solving**: Break down complex problems\n3. **Practice**: Build real projects\n4. **Read code**: Learn from others' implementations\n5. **Debug skills**: Understanding errors is crucial\n\nWhat aspect interests you most?"
      ]
    },
    
    // AI & Machine Learning
    ai: {
      keywords: ['artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'chatgpt', 'llm', 'language model'],
      responses: [
        "**Artificial Intelligence** is transforming technology:\n\n• **Machine Learning**: Systems learn from data without explicit programming\n• **Deep Learning**: Neural networks with multiple layers for complex patterns\n• **Large Language Models**: Like me! Trained on vast text to understand and generate language\n• **Computer Vision**: Understanding images and videos\n• **Robotics**: Physical AI applications\n\nAI is being used in healthcare, finance, entertainment, education, and more. What specific aspect interests you?",
        "The AI field includes:\n\n**Supervised Learning**: Learning from labeled examples\n**Unsupervised Learning**: Finding patterns in unlabeled data\n**Reinforcement Learning**: Learning through trial and error\n**Natural Language Processing**: Understanding human language\n**Computer Vision**: Interpreting visual information\n\nEach has unique applications and challenges!"
      ]
    },
    
    // Science & Math
    science: {
      keywords: ['science', 'physics', 'chemistry', 'biology', 'mathematics', 'equation', 'theory', 'experiment', 'research'],
      responses: [
        "Science is fascinating! Different fields explore different aspects of reality:\n\n• **Physics**: Matter, energy, forces, and the fundamental laws of the universe\n• **Chemistry**: Substances, reactions, and molecular interactions\n• **Biology**: Living organisms, evolution, and ecosystems\n• **Mathematics**: The language of patterns, logic, and quantification\n\nWhat area of science are you curious about?",
        "Scientific inquiry follows a method:\n\n1. **Observation**: Notice phenomena\n2. **Question**: Ask what causes it\n3. **Hypothesis**: Propose an explanation\n4. **Experiment**: Test the hypothesis\n5. **Analysis**: Examine results\n6. **Conclusion**: Draw insights\n\nThis process has led to incredible discoveries!"
      ]
    },
    
    // History & Culture
    history: {
      keywords: ['history', 'ancient', 'civilization', 'war', 'culture', 'tradition', 'historical', 'past'],
      responses: [
        "History helps us understand how we got here. Major themes include:\n\n• **Ancient Civilizations**: Egypt, Rome, Greece, China shaped early human development\n• **Technological Revolutions**: Agriculture, printing, industrial, digital\n• **Social Movements**: Democracy, rights, equality struggles\n• **Cultural Exchange**: How ideas and innovations spread\n\nWhat period or region interests you?",
        "Understanding history involves looking at:\n\n**Political History**: Governments, wars, diplomacy\n**Social History**: How people lived, worked, and thought\n**Economic History**: Trade, resources, development\n**Cultural History**: Art, religion, philosophy\n\nEach lens reveals different insights!"
      ]
    },
    
    // Health & Wellness
    health: {
      keywords: ['health', 'exercise', 'diet', 'nutrition', 'fitness', 'mental health', 'wellness', 'medical'],
      responses: [
        "Health involves multiple dimensions:\n\n• **Physical Health**: Exercise, nutrition, sleep, medical care\n• **Mental Health**: Emotional wellbeing, stress management, therapy\n• **Social Health**: Relationships, community, support networks\n• **Preventive Care**: Regular checkups, healthy habits\n\nA holistic approach considering all aspects is important. What area are you focusing on?",
        "Key pillars of health:\n\n1. **Regular Exercise**: 150+ minutes/week of moderate activity\n2. **Balanced Diet**: Variety, whole foods, moderation\n3. **Quality Sleep**: 7-9 hours for adults\n4. **Stress Management**: Meditation, hobbies, breaks\n5. **Social Connection**: Strong relationships boost wellbeing\n\nSmall consistent changes make a big difference!"
      ]
    },
    
    // Business & Career
    business: {
      keywords: ['business', 'career', 'job', 'startup', 'entrepreneur', 'marketing', 'management', 'leadership'],
      responses: [
        "Business success often depends on:\n\n• **Value Creation**: Solving real problems for customers\n• **Market Understanding**: Knowing your audience and competition\n• **Financial Management**: Revenue, expenses, profitability\n• **Team Building**: Hiring and developing talent\n• **Adaptation**: Responding to changing conditions\n\nWhat aspect of business interests you most?",
        "Career development involves:\n\n**Skills**: Technical and soft skills for your field\n**Experience**: Learning by doing and from others\n**Network**: Building professional relationships\n**Personal Brand**: Your reputation and online presence\n**Continuous Learning**: Staying current and growing\n\nWhat's your current focus?"
      ]
    },
    
    // General Knowledge
    general: {
      keywords: ['define', 'what is', 'explain', 'tell me about', 'information', 'knowledge'],
      responses: [
        "Great question! Based on what you're asking, here's what I can share:\n\nThe topic involves multiple dimensions worth exploring. While I'm running in demo mode with limited knowledge, the key is to consider:\n\n• **Context** - Understanding the background and circumstances\n• **Perspectives** - Different viewpoints on the subject\n• **Implications** - Why it matters and its effects\n• **Applications** - How it's used or relevant in practice\n\nWhat specific aspect would you like to know more about?",
        "That's an interesting topic! Here's a general overview:\n\nUnderstanding any concept involves breaking it down into manageable parts. Consider the fundamentals first, then explore deeper layers. \n\nKey questions to ask:\n- What is the core idea?\n- Why does it matter?\n- How is it used or applied?\n- What are common misconceptions?\n\nWould you like me to focus on a particular aspect?"
      ]
    }
  };

  // Basic conversational responses
  const basicResponses = {
    greetings: [
      "Hello! I'm your AI assistant. How can I help you today?",
      "Hi there! What can I do for you?",
      "Hey! I'm here to help. What's on your mind?"
    ],
    howAreYou: [
      "I'm doing great, thank you for asking! I'm here and ready to help you with anything you need.",
      "I'm functioning perfectly! How about you? What can I assist you with today?",
      "I'm excellent! Thanks for asking. What would you like to talk about?"
    ],
    thanks: [
      "You're welcome! Feel free to ask me anything else.",
      "Happy to help! Is there anything else you'd like to know?",
      "My pleasure! Let me know if you need anything else."
    ],
    help: [
      "I'm an AI assistant here to help you! You can ask me about:\n\n• Programming (Python, JavaScript, Java)\n• Technology & AI\n• Science & Mathematics\n• Health & Wellness\n• Business & Career\n• History & Culture\n• And much more!\n\nWhat topic interests you?",
      "I can help you with questions, provide information, and have conversations about various topics. What would you like to explore?"
    ],
    name: [
      "I'm an AI Chat Assistant! You can think of me as your helpful digital companion.",
      "I'm your AI assistant, here to help you with whatever you need!"
    ]
  };

  // Check for basic patterns first (BEFORE topic matching)
  // Trim and check exact greetings to avoid false matches
  const trimmedMessage = userMessage.trim();
  
  if (/(^hi$|^hai$|^hello$|^hey$|^hii$|^hiii$|greetings|good morning|good evening|good afternoon)/i.test(trimmedMessage)) {
    return getRandomResponse(basicResponses.greetings);
  }
  if (/(how are you|how're you|how r u|how are u|how r you)/i.test(userMessage)) {
    return getRandomResponse(basicResponses.howAreYou);
  }
  if (/(thank|thanks|thx|ty|tysm)/i.test(userMessage)) {
    return getRandomResponse(basicResponses.thanks);
  }
  if (/(help|what can you do|capabilities|your abilities)/i.test(userMessage)) {
    return getRandomResponse(basicResponses.help);
  }
  if (/(your name|who are you|what are you|introduce yourself)/i.test(userMessage)) {
    return getRandomResponse(basicResponses.name);
  }
  if (/(bye|goodbye|see you|talk to you later|gtg)/i.test(userMessage)) {
    return getRandomResponse(["Goodbye! Feel free to come back anytime!", "See you later! Have a great day!", "Take care! I'll be here if you need me."]);
  }

  // Special case: Check for "AI" as a topic (not in greetings like "hai")
  if (/(what is ai|define ai|explain ai|about ai|tell me about ai)/i.test(userMessage)) {
    return getRandomResponse(topicResponses.ai.responses);
  }

  // Check for topic-based responses (only if not a basic greeting)
  // Use word boundaries to avoid false matches
  for (const [topic, data] of Object.entries(topicResponses)) {
    for (const keyword of data.keywords) {
      // Skip short keywords that might match accidentally in greetings
      if (keyword.length <= 3) continue;
      
      // Use word boundary for better matching
      const regex = new RegExp('\\b' + keyword + '\\b', 'i');
      if (regex.test(userMessage)) {
        return getRandomResponse(data.responses);
      }
    }
  }

  // Handle questions
  if (userMessage.includes('?')) {
    // Check for complex/long questions (analytical responses)
    if (userMessage.length > 100) {
      return `That's an excellent and thought-provoking question that deserves a comprehensive answer. You've asked about: "${lastMessage.content.substring(0, 150)}..."

Based on this complex inquiry, here are some key considerations:

1. **Multiple Perspectives**: This topic requires examining various angles and stakeholder viewpoints. Each perspective brings valid concerns and potential solutions.

2. **Contextual Factors**: The answer isn't simple - it depends on specific circumstances, cultural contexts, regulatory frameworks, and evolving societal norms.

3. **Balance and Trade-offs**: Most complex issues involve weighing competing priorities. We must consider both short-term impacts and long-term consequences.

4. **Ethical Dimensions**: Questions of this depth often touch on fundamental values like fairness, privacy, autonomy, and collective wellbeing.

5. **Evidence-Based Approach**: While I'm running in demo mode, a full answer would require examining research, case studies, and expert opinions across relevant fields.

I'd be happy to explore any specific aspect of your question in more detail. What area would you like to focus on first?`;
    }
    
    // Short questions get contextual responses
    return getRandomResponse(topicResponses.general.responses);
  }

  // Enhanced default responses for any random question/statement
  const intelligentResponses = [
    `Great question! Let me share some insights on that:\n\n**Key Points:**\n• This is a fascinating topic with multiple dimensions to consider\n• Understanding the context and background is important\n• Different perspectives can provide valuable insights\n• Practical applications vary depending on the situation\n\n**Why It Matters:**\nThe subject you're asking about connects to broader themes in life, work, or learning. Whether you're exploring this for personal growth, academic purposes, or just curiosity, it's worth diving deeper.\n\n**My Thoughts:**\nBased on general knowledge, the most important thing is to approach this with an open mind and consider various viewpoints. Every topic has interesting angles worth exploring!\n\nWould you like me to elaborate on any specific aspect?`,
    
    `That's an interesting question! Here's what I can tell you:\n\n**Overview:**\nThe topic you're asking about is quite relevant. Let me break it down:\n\n1. **Foundation**: Understanding the basics is crucial for grasping the bigger picture\n2. **Application**: How this applies in real-world scenarios\n3. **Implications**: Why this matters and its potential impact\n4. **Different Views**: Various perspectives people might have\n\n**In Practice:**\nWhen you think about this, consider how it relates to your own experiences or goals. Everyone approaches topics differently based on their background and interests.\n\n**Bottom Line:**\nThe key is to keep exploring, asking questions, and connecting ideas. That's how we learn and grow!\n\nWhat aspect interests you most?`,
    
    `Excellent question! Let me give you a thoughtful response:\n\n**The Big Picture:**\nWhat you're asking touches on important concepts that many people wonder about. Here's my take:\n\n✨ **Core Idea**: At its heart, this is about understanding how things work and why they matter\n\n🎯 **Practical Angle**: In everyday life, this relates to how we make decisions, solve problems, or understand the world around us\n\n💡 **Deeper Insight**: When you dig deeper, there are often surprising connections and interesting nuances\n\n**Why You Should Care:**\nUnderstanding this helps you:\n- Make better informed decisions\n- See connections between different ideas\n- Appreciate complexity and nuance\n- Develop critical thinking skills\n\nI'm happy to discuss this further or explore related topics!`,
    
    `That's a thought-provoking question! Here's my perspective:\n\n**Understanding the Topic:**\nBased on what you're asking, there are several layers to consider:\n\n**Layer 1 - The Basics:**\nEvery topic has fundamental principles that form the foundation. Getting these right is essential for deeper understanding.\n\n**Layer 2 - The Context:**\nThings don't exist in isolation. Understanding the broader context helps you see how everything fits together.\n\n**Layer 3 - The Nuances:**\nThe most interesting part is often in the details and exceptions that make each situation unique.\n\n**Practical Wisdom:**\nThe best approach is usually to:\n- Start with curiosity and openness\n- Look for patterns and connections\n- Question assumptions\n- Learn from multiple sources\n- Apply knowledge thoughtfully\n\nWhat would you like to explore further about this?`,
    
    `Interesting topic! Let me share some comprehensive insights:\n\n📚 **Background:**\nThe subject you're exploring has various dimensions worth understanding. Whether you're learning something new or deepening existing knowledge, it's valuable to consider multiple angles.\n\n🔍 **Key Considerations:**\n• **Fundamentals**: Every topic has core concepts that are essential\n• **Practical Applications**: How theory translates to real situations\n• **Common Challenges**: What obstacles people typically encounter\n• **Best Practices**: Proven approaches that work well\n• **Future Trends**: Where things might be heading\n\n💭 **My Analysis:**\nBased on general knowledge and reasoning, I'd say this is worth understanding because it connects to larger patterns in how we think, work, and live. The more you explore, the more interesting connections you'll discover.\n\n**Next Steps:**\nIf you want to learn more, I recommend exploring related topics, asking specific questions, and thinking about how this applies to your own situation.\n\nShall we dive deeper into any particular aspect?`
  ];

  return getRandomResponse(intelligentResponses);
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = { getAIResponse };
