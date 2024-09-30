// enhancements.js

// Mood tracker enhancements
class MoodTracker {
    constructor() {
        this.moods = [];
        this.currentMood = null;
        this.loadMoods();
    }

    // Add a new mood entry
    addMood(mood, notes) {
        const entry = {
            mood: mood,
            notes: notes,
            date: new Date().toISOString(),
        };
        this.moods.push(entry);
        this.saveMoods();
        this.notifyMoodChange(mood);
    }

    // Save moods to local storage
    saveMoods() {
        localStorage.setItem('moods', JSON.stringify(this.moods));
    }

    // Load moods from local storage
    loadMoods() {
        const storedMoods = JSON.parse(localStorage.getItem('moods'));
        if (storedMoods) {
            this.moods = storedMoods;
        }
    }

    // Notify user of mood change
    notifyMoodChange(mood) {
        const notification = new Notification("Mood Tracker Update", {
            body: `Your mood has been updated to: ${mood}`,
        });
    }

    // Get mood summary
    getMoodSummary() {
        const summary = {};
        this.moods.forEach(entry => {
            summary[entry.mood] = (summary[entry.mood] || 0) + 1;
        });
        return summary;
    }

    // Get mood trends over time
    getMoodTrends() {
        const trends = {};
        this.moods.forEach(entry => {
            const date = new Date(entry.date).toDateString();
            trends[date] = trends[date] || {};
            trends[date][entry.mood] = (trends[date][entry.mood] || 0) + 1;
        });
        return trends;
    }
}

// User interface enhancements
class UIEnhancer {
    constructor() {
        this.moodTracker = new MoodTracker();
        this.renderMoodSummary();
        this.renderMoodTrends();
    }

    // Render mood summary on the dashboard
    renderMoodSummary() {
        const summary = this.moodTracker.getMoodSummary();
        const summaryContainer = document.getElementById('mood-summary');
        summaryContainer.innerHTML = ''; // Clear previous summary

        for (const mood in summary) {
            const moodElement = document.createElement('div');
            moodElement.textContent = `${mood}: ${summary[mood]}`;
            summaryContainer.appendChild(moodElement);
        }
    }

    // Render mood trends on the dashboard
    renderMoodTrends() {
        const trends = this.moodTracker.getMoodTrends();
        const trendsContainer = document.getElementById('mood-trends');
        trendsContainer.innerHTML = ''; // Clear previous trends

        for (const date in trends) {
            const dateElement = document.createElement('div');
            dateElement.textContent = `Date: ${date}`;
            trendsContainer.appendChild(dateElement);

            for (const mood in trends[date]) {
                const moodCountElement = document.createElement('div');
                moodCountElement.textContent = `${mood}: ${trends[date][mood]}`;
                trendsContainer.appendChild(moodCountElement);
            }
        }
    }

    // Add event listener to add mood form
    addMoodEventListener() {
        const form = document.getElementById('add-mood-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const mood = event.target.elements.mood.value;
            const notes = event.target.elements.notes.value;
            this.moodTracker.addMood(mood, notes);
            this.renderMoodSummary();
            this.renderMoodTrends();
            form.reset();
        });
    }
}

// Background animations and effects
function startBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createParticle() {
        const size = Math.random() * 5 + 1;
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off walls
            if (particle.x <= 0 || particle.x >= canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y <= 0 || particle.y >= canvas.height) {
                particle.speedY *= -1;
            }
        });

        requestAnimationFrame(animateParticles);
    }

    setInterval(createParticle, 100);
    animateParticles();
}

// Initialize UI and enhancements
const uiEnhancer = new UIEnhancer();
uiEnhancer.addMoodEventListener();
startBackgroundAnimation();

// Notification permission request
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}