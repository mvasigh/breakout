const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const { height, width } = canvas; 

let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = -2;

// ball values
let ballRadius = 10;

// paddle values
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (width - paddleWidth) / 2;

// paddle controls
let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawBall();
    drawPaddle();

    // ball collision detection
    const xPos = x + dx
    const yPos = y + dy

    if (xPos > width - ballRadius || xPos < ballRadius) {
      dx = -dx;
    }

    if (yPos > height - ballRadius || yPos < ballRadius) {
      dy = -dy;
    }

    // paddle movement
    if (rightPressed && paddleX < width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    // ball movement
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

draw();