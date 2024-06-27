const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 144 * 2;
canvas.height = 256 * 2;
//logo: 96 * 22 at (146,173)
//getready: 87 * 22 at (146, 220)
//gameover: 94 * 19 at (146, 173+26)

const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

let bird, pipes, score, gravity, birdLift, gameRunning, sprite;

sprite = new Image();
sprite.src = 'assets/SPRITES.png';

document.addEventListener('DOMContentLoaded', () => {
    ctx.drawImage(sprite, 0, 0, 144, 256, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, 146, 173, 96, 22, canvas.width / 2 - 96, canvas.height / 2 - 22 - 50, 96 * 2, 22 * 2);
});
class Bird {
    constructor() {
        this.x = 50;
        this.y = canvas.height / 2;
        this.width = 17 * 2;
        this.height = 12 * 2;
        this.velocity = 0;
    }

    draw() {
        ctx.drawImage(sprite, 264, 64, 17, 12, this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;

        if (this.y + this.height > canvas.height || this.y < 0) {
            gameOver();
        }
    }

    flap() {
        this.velocity = birdLift;
    }
}

class Pipe {//pipes always appear in pairs
    constructor() {
        this.spacing = 150;
        this.top = (canvas.height - this.spacing - 120 * 2) + (135 * 2 - (canvas.height - this.spacing - 120 * 2)) * Math.random();
        this.bottom = this.top + this.spacing;
        this.x = canvas.width;
        this.width = 26 * 2;
        this.speed = 2;
    }

    draw() {
        // CanvasDrawImage.drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
        ctx.drawImage(sprite, 302, 0, 26, 135, this.x, this.top - 135 * 2, this.width, 135 * 2); // 上方管道
        ctx.drawImage(sprite, 302 + 28, 0, 26, 120, this.x, this.bottom, this.width, 120 * 2); // 下方管道
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            pipes.shift();
            score++;
            scoreDisplay.innerText = score;
        }
        // 碰撞条件
        if (this.x < bird.x + bird.width && this.x + this.width > bird.x &&
            (bird.y < this.top || bird.y + bird.height > this.bottom)) {
            gameOver();
        }
    }
}

function startGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gravity = 0.3;
    birdLift = -5;
    gameRunning = true;

    startButton.style.display = 'none';
    scoreDisplay.innerText = score;
    pipes.push(new Pipe());

    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.drawImage(sprite, 0, 0, 144, 256, 0, 0, canvas.width, canvas.height);

    bird.update();
    bird.draw();

    if (pipes.length > 0 && pipes[pipes.length - 1].x < canvas.width - 200) {
        pipes.push(new Pipe());
    }

    pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();
    });

    if (!gameRunning)
        ctx.drawImage(sprite, 146, 173 + 26, 94, 19, canvas.width / 2 - 94, canvas.height / 2 - 19 - 50, 94 * 2, 19 * 2);

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    startButton.style.display = 'block';
}

canvas.addEventListener('click', () => {
    if (gameRunning) bird.flap();
});

canvas.addEventListener('touchstart', () => {
    if (gameRunning) bird.flap();
});

document.addEventListener('keydown', () => {
    if (gameRunning) bird.flap();
});

startButton.addEventListener('click', startGame);

// Initialize game
sprite.onload = () => {
    startButton.style.display = 'block';
};
