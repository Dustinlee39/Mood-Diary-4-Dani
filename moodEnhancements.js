// moodEnhancements.js

// Function to calculate and display average mood rating
function calculateAverageMood() {
    const moodRatings = moodHistory.map(entry => {
        const moodValue = parseInt(entry.mood); // Assume mood is a numerical value
        return !isNaN(moodValue) ? moodValue : 0;
    });

    const total = moodRatings.reduce((acc, rating) => acc + rating, 0);
    const average = total / moodRatings.length || 0;

    document.getElementById('averageMoodContainer').textContent = `Average Mood: ${average.toFixed(2)}`;
}

// Function to filter mood history by tag
function filterMoodByTag(tag) {
    const filteredMoodHistory = moodHistory.filter(entry => entry.tags.includes(tag));
    displayMoodHistory(filteredMoodHistory);
}

// Function to display mood history with optional filtering
function displayMoodHistory(filteredHistory = moodHistory) {
    const moodHistoryContainer = document.getElementById('moodHistoryContainer');
    moodHistoryContainer.innerHTML = '';

    filteredHistory.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.textContent = `Date: ${entry.date}, Mood: ${entry.mood}, Tags: ${entry.tags.join(', ')}`;
        moodHistoryContainer.appendChild(entryDiv);
    });

    calculateAverageMood(); // Update average mood after displaying
}

// Event listener for tag filtering
document.getElementById('filterMoodButton').addEventListener('click', () => {
    const filterTag = document.getElementById('filterTagInput').value.trim();
    if (filterTag) {
        filterMoodByTag(filterTag);
    } else {
        displayMoodHistory(); // Show all moods if no filter is provided
    }
});