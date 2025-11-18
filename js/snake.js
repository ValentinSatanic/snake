class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.segments = [
            { x: 10, y: 10 }
        ];
        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
        this.growPending = 0;
    }
    setDirection(dx, dy) {
        if (this.direction.x + dx !== 0 || this.direction.y + dy !== 0) {
            this.nextDirection = { x: dx, y: dy };
        }
    }
    move() {
        this.direction = { ...this.nextDirection };
        if (this.direction.x === 0 && this.direction.y === 0) {
            return;
        }

        const head = { ...this.segments[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        this.segments.unshift(head);

        if (this.growPending > 0) {
            this.growPending--;
        } else {
            this.segments.pop();
        }
    }

    checkSelfCollision() {
        const head = this.segments[0];

        for (let i = 1; i < this.segments.length; i++) {
            if (checkCollision(head, this.segments[i])) {
                return true;
            }
        }
        
        return false;
    }

    checkFoodCollision(food) {
        return checkCollision(this.segments[0], food);
    }

    grow() {
        this.growPending++;
    }

    draw(ctx) {
        this.segments.forEach((segment, index) => {
            const color = index === 0 ? '#2E7D32' : '#4CAF50';
            drawCell(ctx, segment.x, segment.y, color);
        });
    }

    getHead() {
        return { ...this.segments[0] };
    }

    getLength() {
        return this.segments.length;
    }
}
