
// moodEnhancements.js

// Function to display a random motivational quote
function displayRandomQuote() {
    const quotes = [
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
        "The only way to do great work is to love what you do.",
        "You are never too old to set another goal or to dream a new dream.",
        "Believe you can and you're halfway there.",
        "The future belongs to those who believe in the beauty of their dreams."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteDisplay = document.getElementById('quote-display');
    if (quoteDisplay) {
        quoteDisplay.innerText = randomQuote;
    }
}

// Function to initialize mood features
function initializeMoodFeatures() {
    displayRandomQuote();
}

// Call the initialization function
document.addEventListener('DOMContentLoaded', initializeMoodFeatures);