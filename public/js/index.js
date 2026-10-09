// variables
const button = document.querySelector('.btn');
let clicks = 0;
let streak = 1;
let drainable = true;
let decreaseValue = 50;
const progressBar = document.querySelectorAll(".streakBar");
const lastBar = progressBar[progressBar.length - 1]; 

// click button!
button.addEventListener('click', () => {
    clicks += (streak);
    progressBar.forEach((bar, index) => {
        if (bar.classList.contains(`${streak}`)) {
            bar.value = bar.value + 30;
            if (bar.value >= (streak * 100)) {
                if (bar == lastBar) {
                    drainable = false;
                } else {
                    streak++;
                }
            }
        }
    });
});

// drain streak bar
setInterval(() => {
    if (drainable) {
        progressBar.forEach((bar, index) => {
            if (bar.classList.contains(`${streak}`)) {
                //decrease line
                bar.value = bar.value - (bar.max / decreaseValue);
                if (bar.value <= 0) {
                    streak = (streak == 1 ? streak = 1 : streak - 1);
                }
            }
        });
    }
}, 50);

// drainable tick
setInterval(() => {
    if (!drainable) drainable = true;
}, 3000);

// update txt
setInterval(() => {
    const streakText = document.getElementById('streakNum');
    streakText.textContent = `🔥${streak}x`;
    document.getElementById('clicks').textContent = clicks;
    if (streak >= 2) {
        streakText.classList.add('streaked');
        streakText.style.setProperty('--scale', `${(streak / 2)**(streak / 20) + 14}px`);
    } else {
        streakText.classList.remove('streaked');
        streakText.style.setProperty('--scale', `14px`);
    }
}, 50);

document.getElementById("drainage").addEventListener('click', () => {
    if (clicks >= 20) {
        decreaseValue = decreaseValue + 1;
        clicks = clicks - 20;
    }
});