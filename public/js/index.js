// variables
const button = document.querySelector('.btn');
let clicks = 0;
let streak = 1;
let drainable = true;
const progressBar = document.querySelectorAll(".streakBar");
const lastBar = document.querySelectorAll(".streakBar:last-child");

// click button!
button.addEventListener('click', () => {
    clicks += (streak);
    document.getElementById('clicks').textContent = clicks;
    progressBar.forEach((bar, index) => {
        if (bar.classList.contains(`${streak}`)) {
            bar.value = bar.value + 30;
            if (bar.value >= (streak * 100)) {
                streak++;
            }
        }
    });
});

// drain streak bar
setInterval(() => {
    if (drainable) {
        progressBar.forEach((bar, index) => {
            if (bar.classList.contains(`${streak}`)) {
                bar.value = bar.value - 1;
                if (bar.value <= 0) {
                    streak = (streak == 1 ? streak = 1 : streak - 1);
                }
            }
        });
    }
}, 50);

// update streak txt
setInterval(() => {
    const streakText = document.getElementById('streakNum');
    streakText.textContent = `🔥${streak}x`;
    if (streak >= 2) {
        streakText.classList.add('streaked');
        streakText.style.setProperty('--scale', `${(streak / 2)**(streak / 20) + 14}px`);
    } else {
        streakText.classList.remove('streaked');
        streakText.style.setProperty('--scale', `14px`);
    }
}, 50);