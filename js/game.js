class Game {
    constructor() {
        this.canvas = document.getElementById('game-board');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.finalScoreElement = document.getElementById('final-score');
        
        this.snake = new Snake();
        this.food = new Food();
        
        this.score = 0;
        this.highScore = getHighScore();
        this.isRunning = false;
        this.gameSpeed = 150; 
        
        this.setupEventListeners();
        this.updateHighScoreDisplay();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        document.getElementById('start-btn').addEventListener('click', () => this.start());
        document.getElementById('pause-btn').addEventListener('click', () => this.pause());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
        this.setupMobileControls();
    }

    handleKeyPress(e) {
        if (!this.isRunning) return;

        switch(e.key) {
            case 'ArrowUp':
                this.snake.setDirection(0, -1);
                break;
            case 'ArrowDown':
                this.snake.setDirection(0, 1);
                break;
            case 'ArrowLeft':
                this.snake.setDirection(-1, 0);
                break;
            case 'ArrowRight':
                this.snake.setDirection(1, 0);
                break;
        }
    }

    setupMobileControls() {
        const upBtn = document.querySelector('.up');
        const downBtn = document.querySelector('.down');
        const leftBtn = document.querySelector('.left');
        const rightBtn = document.querySelector('.right');

        if (upBtn) {
            upBtn.addEventListener('click', () => this.snake.setDirection(0, -1));
            downBtn.addEventListener('click', () => this.snake.setDirection(0, 1));
            leftBtn.addEventListener('click', () => this.snake.setDirection(-1, 0));
            rightBtn.addEventListener('click', () => this.snake.setDirection(1, 0));
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.gameLoop);
    }

    reset() {
        this.pause();
        this.snake.reset();
        this.food.respawn(this.snake.segments);
        this.score = 0;
        this.updateScoreDisplay();
        this.draw();
    }

    restart() {
        document.getElementById('game-over').style.display = 'none';
        this.reset();
        this.start();
    }

    update() {
        this.snake.move();

        if (this.checkCollisions()) {
            this.gameOver();
            return;
        }

        if (this.snake.checkFoodCollision(this.food.getPosition())) {
            this.handleFoodEaten();
        }

        this.draw();
    }

    checkCollisions() {
        const head = this.snake.getHead();
        
        if (isOutOfBounds(head)) {
            return true;
        }

        if (this.snake.checkSelfCollision()) {
            return true;
        }

        return false;
    }

    handleFoodEaten() {
        this.snake.grow();
        this.score += 10;
        this.updateScoreDisplay();
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            saveHighScore(this.highScore);
            this.updateHighScoreDisplay();
        }
        
        this.food.respawn(this.snake.segments);
        
        if (this.score % 50 === 0 && this.gameSpeed > 50) {
            this.gameSpeed -= 10;
            this.pause();
            this.start();
        }
    }

    gameOver() {
        this.pause();
        this.finalScoreElement.textContent = this.score;
        document.getElementById('game-over').style.display = 'block';
    }

    draw() {
 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        
        this.food.draw(this.ctx);
        
        this.snake.draw(this.ctx);
    }

    drawGrid() {
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= TILE_COUNT; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * GRID_SIZE, 0);
            this.ctx.lineTo(i * GRID_SIZE, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * GRID_SIZE);
            this.ctx.lineTo(this.canvas.width, i * GRID_SIZE);
            this.ctx.stroke();
        }
    }

    updateScoreDisplay() {
        this.scoreElement.textContent = this.score;
    }

    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.draw(); 
    
    window.game = game;
});
