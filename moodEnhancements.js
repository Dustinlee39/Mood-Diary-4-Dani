// Functions for Analyzing Mood
function analyzeMoodEntries(entries) {
    const positiveTrends = entries.filter(entry => entry.mood === "happy").length;
    const negativeTrends = entries.filter(entry => entry.mood === "sad").length;
    return { positive: positiveTrends, negative: negativeTrends };
}

// Suggestions for Beneficial Activities
function suggestActivities(currentMood) {
    const activitySuggestions = {
        happy: ["Go for a walk", "Listen to music", "Call a friend"],
        sad: ["Practice meditation", "Watch a comedy", "Write in your journal"],
    };
    return activitySuggestions[currentMood] || [];
}

// Goal Setting and Tracking
function setMoodGoal(goal) {
    const goals = JSON.parse(localStorage.getItem('moodGoals')) || [];
    goals.push(goal);
    localStorage.setItem('moodGoals', JSON.stringify(goals