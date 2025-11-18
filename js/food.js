class Food {
    constructor() {
        this.position = this.generatePosition();
    }

    generatePosition() {
        return getRandomPosition();
    }

    respawn(snakeSegments) {
        let newPosition;
        let positionValid = false;

        while (!positionValid) {
            newPosition = this.generatePosition();
            positionValid = true;

            for (const segment of snakeSegments) {
                if (checkCollision(newPosition, segment)) {
                    positionValid = false;
                    break;
                }
            }
        }

        this.position = newPosition;
    }

    draw(ctx) {
        drawCell(ctx, this.position.x, this.position.y, '#FF5722');
    }

    getPosition() {
        return { ...this.position };
    }
}
