// variables
const button = document.querySelector('.btn');
let clicks = 0;
let streak = 1;
let drainable = true;
let decreaseValue = 50;
let force = 8;
const progressBar = document.querySelectorAll(".streakBar");
const lastBar = progressBar[progressBar.length - 1]; 
const upgradeBtn = document.getElementById('streakUp');
const strength = parseFloat(document.getElementById('str').dataset.strength);
upgradeBtn.disabled = true;

// click button!
button.addEventListener('click', () => {
    clicks += (strength * streak);
    progressBar.forEach((bar, index) => {
        if (bar.classList.contains(`${streak}`)) {
            bar.value = bar.value + force;
            if (bar.value >= (streak * 100)) {
                if (bar == lastBar) {
                    drainable = false;
                    upgradeBtn.disabled = false;
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
    const str = document.getElementById('str');
    streakText.textContent = `🔥${streak}x`;
    document.getElementById('clicks').textContent = clicks;
    str.textContent = `+${(strength * streak)}`;
    if (streak >= 2) {
        streakText.classList.add('streaked');
        streakText.style.setProperty('--scale', `${(streak / 2)**(streak / 80) + 14}px`);
        str.style.setProperty('--color', 'linear-gradient(to right, orange, rgb(255, 123, 0))');
    } else {
        streakText.classList.remove('streaked');
        streakText.style.setProperty('--scale', `14px`);
        str.style.setProperty('--color', 'linear-gradient(to right, gray, gray)');
    }
}, 50);

document.getElementById("drainage").addEventListener('click', () => {
    if (clicks >= 20) {
        decreaseValue = decreaseValue + 2;
        clicks = clicks - 20;
    }
});

document.getElementById("force").addEventListener('click', () => {
    if (clicks >= 100) {
        force += 2;
        clicks = clicks - 100;
    }
});