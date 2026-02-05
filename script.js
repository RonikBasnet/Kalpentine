// Storage key for localStorage
const STORAGE_KEY = 'valentineData';

// Get all data from localStorage
function getData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

// Variables
let currentName = '';
let currentLevel = 1;
let userData = null;

// DOM Elements
const nameScreen = document.getElementById('nameScreen');
const questionScreen = document.getElementById('questionScreen');
const successScreen = document.getElementById('successScreen');
const noImagesScreen = document.getElementById('noImagesScreen');

const nameInput = document.getElementById('nameInput');
const secretKeyInput = document.getElementById('secretKeyInput');
const submitNameBtn = document.getElementById('submitName');

const greeting = document.getElementById('greeting');
const desperationImage = document.getElementById('desperationImage');
const desperationLevel = document.getElementById('desperationLevel');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionText = document.getElementById('questionText');
const celebrationText = document.getElementById('celebrationText');

const successImage = document.getElementById('successImage');
const successMessage = document.getElementById('successMessage');

// Event Listeners
submitNameBtn.addEventListener('click', handleNameSubmit);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleNameSubmit();
    }
});
secretKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleNameSubmit();
    }
});

yesBtn.addEventListener('click', handleYes);
noBtn.addEventListener('click', handleNo);

// Handle name submission
function handleNameSubmit() {
    const name = nameInput.value.trim();
    const secretKey = secretKeyInput.value.trim();
    
    if (!name) {
        alert('Please enter a name!');
        return;
    }
    
    if (!secretKey) {
        alert('Please enter your secret key!');
        return;
    }
    
    currentName = name;
    const allData = getData();
    
    // Normalize name for lookup (case-insensitive)
    const normalizedName = name.toLowerCase();
    
    // Find matching name
    userData = null;
    let matchedKey = null;
    for (const key in allData) {
        if (key.toLowerCase() === normalizedName) {
            matchedKey = key;
            userData = allData[key];
            break;
        }
    }
    
    // Check if name exists
    if (!userData) {
        alert('❌ Name not found! Please check your name and try again.');
        return;
    }
    
    // Validate secret key
    if (userData.secretKey !== secretKey) {
        alert('❌ Incorrect secret key! Please try again.');
        secretKeyInput.value = '';
        return;
    }
    
    if (!userData.images || Object.keys(userData.images).length === 0) {
        showScreen(noImagesScreen);
        return;
    }
    
    // Start from level 1
    currentLevel = 1;
    updateQuestionScreen();
    showScreen(questionScreen);
    
    // Activate cutesy mode after successful authentication
    document.body.classList.add('cutesy');
    
    // Update text with emojis in cutesy mode
    questionText.textContent = 'Will you be my Valentine? 💕';
    yesBtn.textContent = 'Yes! 💖';
    celebrationText.textContent = '🎉 YES! 🎉';
}

// Update question screen with current level
function updateQuestionScreen() {
    greeting.textContent = `Hey ${currentName}!`;
    
    // Add emoji in cutesy mode
    if (document.body.classList.contains('cutesy')) {
        greeting.textContent = `Hey ${currentName}! 💕`;
    }
    
    // Get image for current level
    const imageUrl = userData.images[currentLevel.toString()];
    
    if (imageUrl) {
        desperationImage.src = imageUrl;
        desperationImage.style.display = 'block';
    } else {
        desperationImage.style.display = 'none';
    }
    
    // Update desperation message
    const messages = [
        '',
        'Just give it a thought... 🥺',
        'Please? I promise it\'ll be fun! 🙏',
        'Come on, you know you want to... 😅',
        'I\'m not giving up! Pretty please? 🥹',
        'This is my last try... please say yes? 😭'
    ];
    
    desperationLevel.textContent = messages[currentLevel] || '';
    
    // Make Yes button bigger and No button smaller as levels increase
    const yesSize = 1 + (currentLevel * 0.1);
    const noSize = 1 - (currentLevel * 0.05);
    yesBtn.style.transform = `scale(${yesSize})`;
    noBtn.style.transform = `scale(${Math.max(noSize, 0.6)})`;
}

// Handle No button click
function handleNo() {
    if (currentLevel < 5) {
        currentLevel++;
        updateQuestionScreen();
        
        // Add shake animation
        questionScreen.style.animation = 'none';
        setTimeout(() => {
            questionScreen.style.animation = 'shake 0.5s';
        }, 10);
    } else {
        // After 5 no's, force to yes screen
        handleYes();
    }
}

// Handle Yes button click
function handleYes() {
    const successImageUrl = userData.images.success;
    
    if (successImageUrl) {
        successImage.src = successImageUrl;
        successImage.style.display = 'block';
    } else {
        successImage.style.display = 'none';
    }
    
    successMessage.textContent = `Yay! ${currentName}, you just made me the happiest person! 💖`;
    showScreen(successScreen);
    
    // Trigger confetti effect
    createConfetti();
}

// Show specific screen
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#4CAF50', '#FFD700'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { top: '-10px', left: confetti.style.left, opacity: 1 },
            { top: '100vh', left: endLeft + '%', opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
