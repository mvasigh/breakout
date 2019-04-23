const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.style.cursor = 'none';
const { height, width } = canvas;

// game values
let speed = 1.05;
let score = 0;
let lives = 3;

// ball values
let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// paddle values
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (width - paddleWidth) / 2;

// paddle controls
let rightPressed = false;
let leftPressed = false;

// brick values
let brickRowCount = 3;
let brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = { brickX, brickY, broken: false };
  }
}

function collisionDetection() {
  bricks.forEach(c => {
    c.forEach(b => {
      const { brickX, brickY, broken } = b;
      if (broken) return;
      if (
        x > brickX &&
        x < brickX + brickWidth &&
        y > brickY &&
        y < brickY + brickHeight
      ) {
        b.broken = true;
        dy = -dy;
        score++;

        if (score === brickRowCount * brickColumnCount) {
          alert('You win!');
          document.location.reload();
        }
      }
    });
  });
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const { brickX, brickY, broken } = bricks[c][r];
      if (broken) continue;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
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

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();

  // brick collision detection
  collisionDetection();
  
  // ball collision detection
  const xPos = x + dx;
  const yPos = y + dy;
  
  // paddle movement
  if (rightPressed && paddleX < width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // ball movement
  if (xPos > width - ballRadius || xPos < ballRadius) {
    dx = -dx;
  }

  if (yPos < ballRadius) {
    dy = -dy;
  } else if (yPos > height - ballRadius) {
    // if paddle is there, bounce the ball as normal
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy * speed;
      dx = dx * speed;
    } else {
      // if ball hits the bottom wall, end the life
      lives--;
      if (!lives) {
        alert('Game over');
        document.location.reload();
        return;
      } else {
        x = width / 2;
        y = height - 30;
        dx = 2;
        dy = -2;
        paddleX = (width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
canvas.addEventListener('mousemove', mouseMoveHandler, false);

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

function mouseMoveHandler(e) {
  const { offsetX } = e;
  paddleX = offsetX - paddleWidth / 2;
}

draw();
