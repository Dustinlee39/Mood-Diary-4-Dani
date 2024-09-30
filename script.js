let moodHistory = [];
let reflections = {};

// Mood Logging Functionality
document.getElementById('logMoodButton').addEventListener('click', function() {
    const mood = document.getElementById('moodInput').value;
    const tags = document.getElementById('moodTags').value.split(',').map(tag => tag.trim());
    const entry = { mood, tags, date: new Date().toISOString() };
    moodHistory.push(entry);
    updateMoodHistoryDisplay();
    document.getElementById('moodTags').value = ''; // Clear input
});

// Update Mood History Display
function updateMoodHistoryDisplay() {
    const moodHistoryContainer = document.getElementById('moodHistoryContainer');
    moodHistoryContainer.innerHTML = ''; // Clear existing content
    moodHistory.forEach(entry => {
        const moodEntryDiv = document.createElement('div');
        moodEntryDiv.textContent = `${new Date(entry.date).toLocaleString()}: ${entry.mood} [${entry.tags.join(', ')}]`;
        moodHistoryContainer.appendChild(moodEntryDiv);
    });
}

// Save Reflection
document.getElementById('saveReflectionButton').addEventListener('click', function() {
    const reflection = document.getElementById('dailyReflection').value;
    const today = new Date().toISOString().split('T')[0];
    reflections[today] = reflection; // Store reflection by date
    alert('Reflection saved!');
});

// Mood Analysis Feature
function analyzeMoodHistory() {
    const moodCounts = {};
    moodHistory.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    alert(`Your most common mood is: ${mostCommonMood}`);
}

// Data Export Feature
function exportMoodHistory() {
    const dataStr = JSON.stringify(moodHistory);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood_history.json';
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('exportButton').addEventListener('click', exportMoodHistory);

// Data Import Feature
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        moodHistory = JSON.parse(e.target.result);
        updateMoodHistoryDisplay();
    };
    reader.readAsText(file);
});

// Feedback Mechanism
document.getElementById('feedbackForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const feedbackText = document.getElementById('feedback').value;
    console.log('Feedback received:', feedbackText);
    alert('Thank you for your feedback!');
    document.getElementById('feedback').value = ''; // Clear input
});

// Performance Optimization
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedLogMood = debounce(() => {
    // Log mood logic can be placed here if needed
}, 300);