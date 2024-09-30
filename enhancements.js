// enhancements.js

// Mood categories for better organization
const moodCategories = {
    happy: "Positive",
    sad: "Negative",
    anxious: "Negative",
    angry: "Negative",
    relaxed: "Positive",
    excited: "Positive",
    overwhelmed: "Negative",
};

// Function to categorize moods and display feedback
function categorizeMood(mood) {
    return moodCategories[mood] || "Neutral";
}

// Enhanced mood logging with categorization
document.getElementById('logMoodButton').addEventListener('click', function() {
    const mood = document.getElementById('moodInput').value;
    const tags = document.getElementById('moodTags').value.split(',').map(tag => tag.trim());
    const category = categorizeMood(mood);
    const entry = { mood, tags, category, date: new Date().toISOString() };
    moodHistory.push(entry);
    updateMoodHistoryDisplay();
    document.getElementById('moodTags').value = ''; // Clear input
});

// Function to create a mood visualization chart
function createMoodChart() {
    const moodCounts = {};
    moodHistory.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    // Create a simple chart using Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;
    document.body.appendChild(canvas);

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
    let i = 0;
    const total = moodHistory.length;

    for (const mood in moodCounts) {
        const count = moodCounts[mood];
        const percentage = (count / total) * 100;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(i * (canvas.width / Object.keys(moodCounts).length), canvas.height - percentage * (canvas.height / 100), (canvas.width / Object.keys(moodCounts).length), percentage * (canvas.height / 100));
        i++;
    }
}

// Function to show chart upon clicking a button
document.getElementById('showChartButton').addEventListener('click', function() {
    createMoodChart();
});

// Adding user settings feature
let userSettings = {
    theme: "light",
};

document.getElementById('settingsButton').addEventListener('click', function() {
    const theme = prompt("Enter your preferred theme (light/dark):", userSettings.theme);
    if (theme === "dark") {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#fff";
        userSettings.theme = "dark";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
        userSettings.theme = "light";
    }
});

// Function to reset mood history
document.getElementById('resetMoodButton').addEventListener('click', function() {
    moodHistory = [];
    updateMoodHistoryDisplay();
    alert('Mood history reset!');
});