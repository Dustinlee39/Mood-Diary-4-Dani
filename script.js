// Improved User Interaction Handling
document.addEventListener("DOMContentLoaded", () => {
    const moodForm = document.getElementById("moodForm");
    moodForm.addEventListener("submit", handleMoodSubmission);
});

// Function to handle mood form submission
function handleMoodSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const moodInput = document.getElementById("moodInput").value;
    const moodDate = new Date().toLocaleDateString();

    if (validateMoodInput(moodInput)) {
        saveMoodEntry({ mood: moodInput, date: moodDate });
        displayMoodEntry({ mood: moodInput, date: moodDate });
        resetMoodForm();
    } else {
        alert("Please enter a valid mood.");
    }
}

// Validate mood input
function validateMoodInput(input) {
    const validMoods = ["happy", "sad", "anxious", "stressed"];
    return validMoods.includes(input.toLowerCase());
}

// Save mood entry to local storage or cloud
function saveMoodEntry(entry) {
    let moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
    moodEntries.push(entry);
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
}

// Display mood entry on the page
function displayMoodEntry(entry) {
    const moodList = document.getElementById("moodList");
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.date}: ${entry.mood}`;
    moodList.appendChild(listItem);
}

// Reset mood form after submission
function resetMoodForm() {
    document.getElementById("moodInput").value = "";
}

// Enhanced Animation Effects
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";
    let last = +new Date();
    const fade = () => {
        element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
        last = +new Date();
        if (+element.style.opacity < 1) {
            requestAnimationFrame(fade);
        }
    };
    fade();
}

// Performance Optimizations
window.addEventListener("resize", debounce(() => {
    // Logic to handle resizing, e.g., adjusting layout
    console.log("Window resized");
}, 250));

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Integration with a Database or Cloud Storage
function syncWithCloud() {
    // Example placeholder for cloud sync logic
    // This would typically involve API calls to save or retrieve mood entries
    console.log("Syncing with cloud...");
}

// Example of how to call sync function
document.getElementById("syncButton").addEventListener("click", syncWithCloud);

// Security Features
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input; // Escape any HTML
    return div.innerHTML;
}

// Example usage of sanitize input
const userMoodInput = sanitizeInput(document.getElementById("moodInput").value);
console.log("Sanitized Input:", userMoodInput);

// Service Workers for Offline Capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}