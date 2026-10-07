const button = document.querySelector('.btn');
let clicks = 0;
const progressBar = document.getElementById('progress');

button.addEventListener('click', () => {
    clicks++;
    document.getElementById('clicks').textContent = clicks;
    progressBar.value = Math.min(progressBar.value + 5, 100);
});

setInterval(() => {
    progressBar.value = progressBar.value - 1;
    if (progressBar.value <= 0) {
        progressBar.value = 0;
    }
}, 50);