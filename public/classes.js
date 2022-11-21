const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const gravity = 0.2;

export class Sprite {

    height = 150;
    width = 50;
    image = new Image();

    constructor({position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {

        this.position = position;
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurr = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }

    draw() {
        context.drawImage(
            this.image,
            this.framesCurr * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurr < this.framesMax - 1) {
                this.framesCurr++
            } else {
                this.framesCurr = 0
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames()
    }
}

export class Warrior extends Sprite {

    height = 150;
    width = 50;
    lastKey;
    isAttacking;
    health = 100;
    isDead = false;

    constructor({
                    position,
                    velocity,
                    imgSrc,
                    scale,
                    framesMax,
                    offset,
                    sprites,
                    attackBox = {offset: {}, width: undefined, height: undefined}
                }) {

        super({
            position, imgSrc, scale, framesMax, offset
        })
        this.velocity = velocity;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };

        this.framesCurr = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
    }

    attack() {
        this.isAttacking = true;
        this.switchSprite('attack');
    }

    takeHit() {
        this.health -= 10;
        if (this.health <= 0) {
            this.switchSprite('death');
        }
        this.switchSprite('take_hit');
    }

    update() {

        this.draw();
        if (!this.isDead) {
            this.animateFrames()
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 60) {
            this.velocity.y = 0;
            this.position.y = 366;

        } else {
            this.velocity.y += gravity;
        }
    }

    switchSprite(sprite) {

        if (this.image === this.sprites.death.image) {
            if (this.framesCurr === this.sprites.death.framesMax - 1) {
                this.isDead = true;
            }
            return
        }

        if (this.image === this.sprites.attack.image && this.framesCurr < this.sprites.attack.framesMax - 1) return;
        if (this.image === this.sprites.take_hit.image && this.framesCurr < this.sprites.take_hit.framesMax - 1) return;

        switch (sprite) {

            case 'idle' :
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'run' :
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'jump' :
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'fall' :
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'attack' :
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'take_hit' :
                if (this.image !== this.sprites.take_hit.image) {
                    this.image = this.sprites.take_hit.image;
                    this.framesMax = this.sprites.take_hit.framesMax;
                    this.framesCurr = 0;
                }
                break;

            case 'death' :
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurr = 0;
                }
                break;
        }
    }
}