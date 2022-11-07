const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height); /* tworzymy nasz prostokąt podajac rozmiary*/

const gravity = 0.2;

function rectangleCollision(rectangle1, rectangle2) {
    return (
        rectangle1.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.attackBox.height
    )
}

class Sprite {

    height = 150;
    width = 50;
    lastKey;
    isAttacking;
    health = 100;

    constructor({position, velocity, color = 'red', offset}) {
        this.position = position;
        this.velocity = velocity;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
            offset,
        };
        this.color = color;
    }

    // tworzymy figury przedstawiajace warriorow
    draw() {
        // ludek
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attackBox
        if (this.isAttacking) {
            context.fillStyle = 'green';
            context.fillRect(this.attackBox.position.x + this.attackBox.offset.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 200)
    }

    // ta funkcja jest odpowiedzialana za nasza animacje, za ruch
    update() {
        this.draw();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'yellow'
})

const enemy = new Sprite({
    position: {
        x: 250,
        y: 0
    }
    ,
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}

/* tworzymy petlę animacji. dajac animate() do funkcji window.requestAnimationFrame() tworzymy petle
animacji

* */
function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player1 movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3;
    }

    // player2 movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3;
    }

    // detecting collisions

    if (
        rectangleCollision(player, enemy) &&
        player.isAttacking
    ) {
        enemy.health -= 5;
        document.querySelector('.health-bar-playerTwo').style.width = enemy.health + "%";
        player.isAttacking = false;
    }
    if (
        rectangleCollision(player, enemy) &&
        enemy.isAttacking
    ) {
        player.health -= 5;
        document.querySelector('.health-bar-playerOne').style.width = player.health + "%";
        enemy.isAttacking = false;
    }
}

animate()

window.addEventListener('keydown', (e) => {

    const key = e.key;

    switch (key) {
        case 'd' :
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a' :
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w' :
            player.velocity.y = -10;
            break;
        case ' ' :
            player.attack();
            break;
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp' :
            enemy.velocity.y = -10;
            break;
        case 'ArrowDown' :
            enemy.attack()
            break;
    }
})
window.addEventListener('keyup', (e) => {

    const key = e.key;

    switch (key) {
        case 'd' :
            keys.d.pressed = false;
            break;
        case 'a' :
            keys.a.pressed = false;
            break;

        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false;
            break;
    }
})