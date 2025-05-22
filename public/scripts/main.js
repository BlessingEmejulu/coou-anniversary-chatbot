
// Initialize Lucide icons
lucide.createIcons();

// State variables
let onboardingStep = 1;
let userName = '';
let messages = [];
let isTyping = false;

// DOM Elements
const onboardingContainer = document.getElementById('onboardingContainer');
const chatContainer = document.getElementById('chatContainer');
const messagesWrapper = document.getElementById('messagesWrapper');
const messageInput = document.getElementById('messageInput');
const tokenInput = document.getElementById('tokenInput');
const sendBtn = document.getElementById('sendBtn');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const userNameInput = document.getElementById('userName');

// Event Listeners
nextBtn.addEventListener('click', nextOnboardingStep);
skipBtn.addEventListener('click', skipOnboarding);
messageInput.addEventListener('input', handleInputChange);
messageInput.addEventListener('keypress', handleKeyPress);
sendBtn.addEventListener('click', handleSendMessage);
userNameInput.addEventListener('input', (e) => {
  userName = e.target.value;
});

// Functions
function nextOnboardingStep() {
  if (onboardingStep < 3) {
    onboardingStep++;
    updateOnboardingStep();
  } else {
    startChat();
  }
}

function skipOnboarding() {
  startChat();
}

function updateOnboardingStep() {
  // Hide all steps
  step1.classList.remove('active');
  step2.classList.remove('active');
  step3.classList.remove('active');

  // Show current step
  if (onboardingStep === 1) {
    step1.classList.add('active');
    skipBtn.textContent = 'Skip';
    nextBtn.innerHTML = 'Next <i data-lucide="chevron-right"></i>';
  } else if (onboardingStep === 2) {
    step2.classList.add('active');
    skipBtn.textContent = 'Skip';
    nextBtn.innerHTML = 'Next <i data-lucide="chevron-right"></i>';
  } else if (onboardingStep === 3) {
    step3.classList.add('active');
    skipBtn.textContent = '';
    nextBtn.innerHTML = 'Start Chatting <i data-lucide="chevron-right"></i>';
  }

  // Refresh icons (needed for dynamically added icons)
  lucide.createIcons();
}

function startChat() {
  onboardingContainer.style.display = 'none';
  chatContainer.classList.add('active');

  // Add welcome message
  addMessage({
    text: `Hello ${userName || 'there'}! Welcome to the COOU Anniversary ChatBot! I can answer questions about our university's history, achievements, and celebrations. How can I help you today?
`,
    sender: 'bot'
  });
}

function handleInputChange(e) {
  sendBtn.disabled = e.target.value.trim() === '';
}

function handleKeyPress(e) {
  if (e.key === 'Enter' && messageInput.value.trim() !== '') {
    handleSendMessage();
  }
}

function handleSendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  // Add user message
  addMessage({
    text,
    sender: 'user'
  });

  // Clear input
  messageInput.value = '';
  sendBtn.disabled = true;

  // Show typing indicator
  showTypingIndicator();

  // Simulate bot response after delay
  setTimeout(() => {
    hideTypingIndicator();
    generateBotResponse(text);
  }, 1500);
}

function addMessage(message) {
  messages.push(message);
  renderMessages();
  scrollToBottom();
}

function renderMessages() {
  messagesWrapper.innerHTML = '';

  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}`;

    if (message.sender === 'bot') {
      messageDiv.innerHTML = `
            <div class="message-avatar bot">
              <i data-lucide="sparkles"></i>
            </div>
            <div class="message-bubble bot">
              <div class="message-tail bot"></div>
              <p>${message.text}</p>
              <div class="message-time bot">${getTimeString()}</div>
            </div>
          `;
    } else {
      messageDiv.innerHTML = `
            <div class="message-bubble user">
              <div class="message-tail user"></div>
              <p>${message.text}</p>
              <div class="message-time user">${getTimeString()}</div>
            </div>
            <div class="message-avatar user">
              <i data-lucide="user"></i>
            </div>
          `;
    }

    messagesWrapper.appendChild(messageDiv);
  });

  // Refresh icons (needed for dynamically added icons)
  lucide.createIcons();
}

function showTypingIndicator() {
  isTyping = true;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = `
        <div class="message-avatar bot">
          <i data-lucide="sparkles"></i>
        </div>
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;

  messagesWrapper.appendChild(typingDiv);
  scrollToBottom();

  // Refresh icons (needed for dynamically added icons)
  lucide.createIcons();
}

function hideTypingIndicator() {
  isTyping = false;
  const typingIndicators = document.querySelectorAll('.typing-indicator');
  typingIndicators.forEach(indicator => indicator.remove());
}

async function generateBotResponse(userInput) {
  try {
    const response = await fetch('/ask.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput, csrf_token: tokenInput.value })
    });
    const data = await response.json();
    addMessage({
      text: data.text,
      sender: 'bot'
    });
  } catch (error) {
    console.log(error);
    addMessage({
      text: "Sorry, there was an error connecting to Gemini.",
      sender: 'bot'
    });
  }
}

function getTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
}