let count = 0;
let clickTimestamps = [];
let startTime = Date.now();
let totalElapsedTime = parseFloat(localStorage.getItem('totalElapsedTime')) || 0;

// Load saved clicks from local storage
count = parseInt(localStorage.getItem('clickCount')) || 0;
document.getElementById('clickCount').textContent = `Clicks: ${count}`;

document.getElementById('clickButton').addEventListener('click', () => {
    const now = Date.now();
    clickTimestamps.push(now);

    // Update click count
    count++;
    document.getElementById('clickCount').textContent = `Clicks: ${count}`;

    // Save updated click count to local storage
    localStorage.setItem('clickCount', count);

    // Add shake effect
    const button = document.getElementById('clickButton');
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 300); // Remove shake effect after animation
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', () => {
    count = 0;
    localStorage.setItem('clickCount', count);
    document.getElementById('clickCount').textContent = `Clicks: ${count}`;
    startTime = Date.now(); // Reset start time for average calculation
    totalElapsedTime = 0;
    localStorage.setItem('totalElapsedTime', totalElapsedTime);
});

// Update average clicks per second every 1 second
setInterval(() => {
    const now = Date.now();
    const elapsedTimeInSeconds = (now - startTime) / 1000;

    // Update total elapsed time
    totalElapsedTime += elapsedTimeInSeconds;
    localStorage.setItem('totalElapsedTime', totalElapsedTime);

    // Calculate average clicks per second
    const averageClicksPerSecond = (count / totalElapsedTime).toFixed(2);
    document.getElementById('clickRate').textContent = `Clicks per second: ${averageClicksPerSecond}`;

    // Reset start time for the next interval
    startTime = now;
}, 1000);
