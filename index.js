const canvas = document.getElementById('fullScreenCanvas');
const ctx = canvas.getContext('2d');

width = 0
height = 0
// Resize and background functions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground(0.1 * (2 * Math.PI));
    width = canvas.width;
    height = canvas.height;
}


function drawBackground(c) {
    ctx.fillStyle = '#000000'; // dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    change = c / 1000
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Select the sliders
const slider1 = document.querySelectorAll('input[type="range"]')[0];
const slider2 = document.querySelectorAll('input[type="range"]')[1];
const slider3 = document.querySelectorAll('input[type="range"]')[2];
const slider4 = document.querySelectorAll('input[type="range"]')[3];
const slider5 = document.querySelectorAll('input[type="range"]')[4];


// Function to read and store values
function getSliderValues() {
    const value1 = parseInt(slider1.value, 10);
    const value2 = parseInt(slider2.value, 10);
    const value3 = parseInt(slider3.value, 10);
    const value4 = parseInt(slider4.value, 10);
    const value5 = parseInt(slider5.value, 10);
    return { value1, value2, value3, value4, value5 };
}

let counter = 0;
let interval = null;
let prevValue1 = null;
let prevValue2 = null;
let prevValue3 = null;
let prevValue4 = null;
let prevValue5 = null;

function startTimer(rate) {
    if (interval) clearInterval(interval);
    interval = setInterval(draw, rate);
}

function draw() {
    const { value1, value2, value3, value4, value5 } = getSliderValues();
    if (value1 !== prevValue1) {
        prevValue1 = value1;
        r = hush(value1, 1, 255)
        gr = hush(value1, 2, 255)
        b = hush(value1, 3, 255)
        drawBackground(value5)
    }
    if (value2 !== prevValue2) {
        prevValue2 = value2;
        rC = hush(value2, 1, 100) / hush(value2, 2, 100)
        gC = hush(value2, 3, 100) / hush(value2, 4, 100)
        bC = hush(value2, 5, 100) / hush(value2, 6, 100)
        drawBackground(value5)
    }
    if (value3 !== prevValue3) {
        prevValue3 = value3;
        r = hush(value1, 1, 255)
        gr = hush(value1, 2, 255)
        b = hush(value1, 3, 255)
        drawBackground(value5)
    }
    if (value4 !== prevValue4) {
        prevValue4 = value4;
        startTimer(value4); // Restart with new value4 as interval
        return; // Skip this tick so we don’t double-run sunflower
    }
    if (value5 !== prevValue5) {
        prevValue5 = value5;
        r = hush(value1, 1, 255)
        gr = hush(value1, 2, 255)
        b = hush(value1, 3, 255)
        drawBackground(value5)
    }
    sunflower(value3, value4); // Your drawing or animation logic
    counter++;
}

prevValue4 = getSliderValues().value4;
startTimer(prevValue4);

function hush(seed, num, limit) {
    const combined = seed * 73856093 ^ num * 19349663; // bitwise spice
    const x = Math.sin(combined) * 10000;
    const raw = x - Math.floor(x); // fractional part
    return Math.floor(raw * limit) + 1; // Scale to 1–limit
}

r = 0, gr = 0, b = 0;
rC = 0, gC = 0, bC = 0;
n1 = 0, n2 = 0;
theta = 0;
radius = 0;
change = 0.1 * (2 * Math.PI);

function sunflower(size, speed) {    
    theta = 0;
    radius = 0;
    change += 0.0001;
    console.log(r, gr, b);
    
    r += rC * speed;
    gr += gC * speed;
    b += bC * speed;
    if (255 < r || 0 > r) {
        rC *= -1
        r -= r%255
    }
    if (255 < gr || 0 > gr) {
        gC *= -1
        gr -= gr%255
    }
    if (255 < b || 0 > b) {
        bC *= -1
        b -= b%255
    }
    ctx.fillStyle = `rgb(${r}, ${(gr)}, ${(b)})`;
    for (i = 0; i < 3000; i++) {
        n1 = (radius * Math.sin(theta) * size + width / 2);
        n2 = (radius * Math.cos(theta) * size + height / 2);
        ctx.fillRect(n1, n2, size, size);
        radius += 1;
        theta += change;
    }
}