const button = document.querySelector('.btn');
let clicks = 0;
let streak = 1;
const progressBar = document.getElementById('progress');

button.addEventListener('click', () => {
    clicks += (streak);
    document.getElementById('clicks').textContent = clicks;
    progressBar.value = Math.min(progressBar.value + 7, 100);
    if (progressBar.value >= 100) {
        streak++;
    }
});

setInterval(() => {
    let drainable = true;
    if (drainable) {
        progressBar.value = progressBar.value - 1;
        if (progressBar.value <= 0) {
            progressBar.value = 0;
        }
        if (progressBar.value >= 100) {
            progressBar.value = 100;
            drainable = false;
        }
    }
}, 50);

setInterval(() => {
    document.getElementById('streakNum').textContent = `🔥${streak}x`;
}, 50);