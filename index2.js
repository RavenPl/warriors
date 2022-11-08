const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const clock = document.querySelector('.clock');
const resultInfo = document.querySelector('.resultInfo');

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
    image = new Image();


    constructor({position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {

        this.position = position;
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurr = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
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

class Warrior extends Sprite {

    height = 150;
    width = 50;
    lastKey;
    isAttacking;
    health = 100;

    constructor({position, velocity, color = 'red', imgSrc, scale, framesMax, offset}) {

        super({
            position, imgSrc, scale, framesMax, offset
        })

        this.velocity = velocity;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        };
        this.color = color;

        this.framesCurr = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
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
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 60) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity;
        }
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: "./img/background.png"
})

const shop = new Sprite({
    position: {
        x: 755,
        y: 255
    },
    scale: 2,
    imgSrc: "./img/shop.png",
    framesMax: 6
})

const player = new Warrior({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },

    imgSrc: "./img/Warrior1/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 190,
        y: 155
    },

})

const enemy = new Warrior({
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
        x: 150,
        y: 0
    },
    imgSrc: "./img/Warrior1/Idle.png",
    framesMax: 8,
    scale: 2,
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

let time = 16;
let idInterval;

function whoWins({player1, player2, idInterval}) {

    clearInterval(idInterval);
    resultInfo.style.display = "flex";
    if (player1.health > player2.health) {
        resultInfo.textContent = 'Player1 wins!';
    } else if (player1.health < player2.health) {
        resultInfo.textContent = 'Player2 wins!';
    } else if (player1.health === player2.health) {
        resultInfo.textContent = 'Tie!';
    }
}

function fightTimer() {

    if (time > 0) {
        idInterval = setTimeout(fightTimer, 1000);
        time--;
        clock.textContent = String(time);
    }

    if (time === 0) {
        whoWins({player1: player, player2: enemy, idInterval});
    }

}

fightTimer()

/* tworzymy petlę animacji. dajac animate() do funkcji window.requestAnimationFrame() tworzymy petle
animacji

* */
function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();

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

// sprawdzanie kto wygral gdy zycie jest ponizej 0

    if (player.health <= 0 || enemy.health <= 0) {
        whoWins({player1: player, player2: enemy, idInterval});
        resultInfo.style.display = "flex";
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