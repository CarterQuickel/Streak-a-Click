// variables
let clicks = 0;
let streak = 1;
let drainable = true;
let decreaseValue = 50;
let force = 8;
let overclocked = false;

// button levels
let drainageLvl = 1;
let forceLvl = 1;

// upgrade costs
let drainageCost = 20;
let forceCost = 100;

//overclock
let overclockMultiplier = 2;
let overclockResistance = 6;

// elements
const button = document.querySelector('.btn');
const progressBar = document.querySelectorAll(".streakBar");
const lastBar = progressBar[progressBar.length - 1]; 
const upgradeBtn = document.getElementById('streakUp');
const strength = parseFloat(document.getElementById('str').dataset.strength);
upgradeBtn.disabled = true;

// click button!
button.addEventListener('click', () => {
    clicks += (overclocked ? Math.floor((strength * streak) / overclockMultiplier) : strength * streak);
    progressBar.forEach((bar, index) => {
        if (bar.classList.contains(`${streak}`)) {
            bar.value = (overclocked ? (bar.value + (force - overclockResistance)) : bar.value + force);
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
    document.getElementById('overclock').textContent = `${overclocked ? 'Default Mode' : 'Resistant Ember Mode'}`;
    document.getElementById('clicks').textContent = clicks;
    str.textContent = `+${(overclocked ? Math.floor((strength * streak) / overclockMultiplier) : strength * streak)}`;
    if (streak >= 2) {
        streakText.classList.add('streaked');
        streakText.style.setProperty('--scale', `${(streak / 2)**(streak / 80) + 14}px`);
        str.style.setProperty('--color', 'linear-gradient(to right, orange, rgb(255, 123, 0))');
    } else {
        streakText.classList.remove('streaked');
        streakText.style.setProperty('--scale', `14px`);
        str.style.setProperty('--color', 'linear-gradient(to right, gray, gray)');
    }
    document.querySelectorAll('.updata').forEach((ud) => {
        const drain = ud.classList.contains("drainage");
        ud.querySelector(".lvl").textContent = `Lvl. ${drain ? drainageLvl : forceLvl}`;
        ud.querySelector(".cost").textContent = `${drain ? drainageCost : forceCost} clicks`;
        ud.querySelector(".current").textContent = `${drain ? Math.round((100 / decreaseValue) * -10) / 10 : force} ${drain ? 'str/s' : 'str'}`;
    });
}, 50);

//upgrade drain level
document.getElementById("drainage").addEventListener('click', () => {
    if (clicks >= drainageCost) {
        decreaseValue = decreaseValue + 2;
        clicks = clicks - drainageCost;
        drainageLvl++;
        drainageCost += 15;
    }
});

//upgrade force level
document.getElementById("force").addEventListener('click', () => {
    if (clicks >= forceCost) {
        force += 2;
        clicks = clicks - forceCost;
        forceLvl++;
        forceCost += 75;
    }
});

//overclock
document.getElementById("overclock").addEventListener('click', () => {
    overclocked = overclocked ? false : true;
    if (overclocked) {
        progressBar.forEach((pb) => {
            pb.style.setProperty('--gColor', 'linear-gradient(to right, rgb(187, 71, 152), rgb(221, 135, 135))');
        });
        document.getElementById("overclock").style.background = '#2563eb';
        document.querySelector(".hero").style.border = '3px solid rgb(187, 71, 152)';
        document.getElementById("mainBTN").style.background = 'linear-gradient(to right, rgb(187, 71, 152), rgb(221, 135, 135))';
    } else {
        progressBar.forEach((pb) => {
            pb.style.setProperty('--gColor', 'linear-gradient(to right, orange, rgb(255, 123, 0))');
        });
        document.getElementById("overclock").style.background = 'linear-gradient(to right, rgb(187, 71, 152), rgb(221, 135, 135))';
        document.querySelector(".hero").style.border = 'none';
        document.getElementById("mainBTN").style.background = '#2563eb';
    }
});