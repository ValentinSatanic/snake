const GRID_SIZE = 20;
const TILE_COUNT = 20; 

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
}

function checkCollision(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function saveHighScore(score) {
    localStorage.setItem('snakeHighScore', score);
}

function getHighScore() {
    return parseInt(localStorage.getItem('snakeHighScore')) || 0;
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
}

function isOutOfBounds(position) {
    return position.x < 0 || position.x >= TILE_COUNT || 
           position.y < 0 || position.y >= TILE_COUNT;
}
