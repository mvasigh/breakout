const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const { height, width } = canvas; 

let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = -2;

let ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawBall();

    const xPos = x + dx
    const yPos = y + dy

    if (xPos > width - ballRadius || xPos < ballRadius) {
      dx = -dx;
    }

    if (yPos > height - ballRadius || yPos < ballRadius) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

draw();