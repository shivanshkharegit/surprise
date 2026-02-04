// Get DOM elements
const card = document.getElementById('card');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const message = document.getElementById('message');

// Array of playful messages for "No" button evasion
const messages = [
    "Nice try! 😈",
    "You're persistent 👀",
    "Getting warmer… 🔥",
    "You know the answer 😏"
];
let messageIndex = 0; // Track which message to show
let hoverInterval; // For continuous movement on hover
let continuousMoveInterval; // For keeping "No" button moving after "Yes"

// Function to move the "No" button randomly
function moveNoButton() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate random position within bounds (avoiding edges for usability)
    const randomX = Math.random() * (viewportWidth - 200) + 50; // 200px button width approx
    const randomY = Math.random() * (viewportHeight - 100) + 50; // 100px button height approx

    // Apply random position
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Show next playful message (only during initial interaction)
    if (!continuousMoveInterval) {
        message.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length; // Cycle through messages
    }
}

// Function to move "No" button 4-5 times in sequence on click
function moveNoButtonSequence() {
    let moves = 0;
    const maxMoves = 5; // 5 moves for fun
    const moveInterval = setInterval(() => {
        moveNoButton();
        moves++;
        if (moves >= maxMoves) {
            clearInterval(moveInterval);
        }
    }, 200); // 200ms delay between each move
}

// Start moving "No" button continuously on hover (every 100ms)
noBtn.addEventListener('mouseenter', () => {
    hoverInterval = setInterval(moveNoButton, 100); // Move every 100ms while hovering
});

// Stop moving when not hovering
noBtn.addEventListener('mouseleave', () => {
    clearInterval(hoverInterval);
});

// On click, trigger 4-5 moves in sequence
noBtn.addEventListener('click', moveNoButtonSequence);

// "Yes" button behavior with more content
yesBtn.addEventListener('click', () => {
    // Replace card content with more romantic and playful text
    card.innerHTML = `
        <h1>I knew it! 🎉</h1>
        <p>Congratulations! You are now officially my Valentine 💘</p>
        <p>From this day on, every moment with you is a celebration! Let's make memories, share laughs, and fill our days with love. You're my everything! ❤️✨</p>
        <p>Happy Valentine's Day, my love! Can't wait for our adventures together. 😘</p>
        <div class="hearts celebration-hearts">
            <span>💖</span><span>💕</span><span>💘</span><span>💖</span><span>💕</span><span>💘</span><span>💖</span><span>💕</span>
        </div>
    `;

    // Add celebration class for animation
    card.classList.add('celebration');

    // Make "No" button unclickable and keep it moving randomly forever
    noBtn.style.pointerEvents = 'none'; // Disable clicks
    continuousMoveInterval = setInterval(moveNoButton, 1000); // Move every 1 second continuously
});
