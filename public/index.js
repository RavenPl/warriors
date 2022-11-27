const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const resultInfo = document.querySelector('.resultInfo');
const clock = document.querySelector('.clock');
const id1 = document.querySelector('.id1').textContent;
const id2 = document.querySelector('.id2').textContent;

import {goBack, rectangleCollision} from './utils.js';
import {Sprite, Warrior} from './classes.js'

let player1Wins = 0;
let player2Wins = 0;
let endOfGame = false;
let tie = false;
let time = 30;

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height); /* tworzymy nasz prostokąt podajac rozmiary*/

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: "/img/background.png"
})

export const player = new Warrior({
    position: {
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imgSrc: "/img/Warrior1/Idle.png",
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 150,
        y: 55
    },
    sprites: {
        idle: {
            imgSrc: "/img/Warrior1/Idle.png",
            framesMax: 10,
        },
        run: {
            imgSrc: "/img/Warrior1/Run.png",
            framesMax: 8,
        },
        jump: {
            imgSrc: "/img/Warrior1/Jump.png",
            framesMax: 3,
        },
        fall: {
            imgSrc: "/img/Warrior1/Fall.png",
            framesMax: 3,
        },
        attack: {
            imgSrc: "/img/Warrior1/Attack.png",
            framesMax: 7,
        },
        take_hit: {
            imgSrc: "/img/Warrior1/Take hit.png",
            framesMax: 3,
        },
        death: {
            imgSrc: "/img/Warrior1/Death.png",
            framesMax: 11,
        }
    },
    attackBox: {
        offset: {
            x: 50,
            y: 50
        },
        width: 50,
        height: 50
    }

})

export const enemy = new Warrior({
    position: {
        x: 800,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 215,
        y: 235
    },
    imgSrc: "/img/Warrior2/Idle.png",
    framesMax: 4,
    scale: 3,

    sprites: {
        idle: {
            imgSrc: "/img/Warrior2/Idle.png",
            framesMax: 4,
        },
        run: {
            imgSrc: "/img/Warrior2/Run.png",
            framesMax: 8,
        },
        jump: {
            imgSrc: "/img/Warrior2/Jump.png",
            framesMax: 2,
        },
        fall: {
            imgSrc: "/img/Warrior2/Fall.png",
            framesMax: 2,
        },
        attack: {
            imgSrc: "/img/Warrior2/Attack.png",
            framesMax: 4,
        },
        take_hit: {
            imgSrc: "/img/Warrior2/Take hit.png",
            framesMax: 3,
        },
        death: {
            imgSrc: "/img/Warrior2/Death.png",
            framesMax: 7,
        }
    },
    attackBox: {
        offset: {
            x: -140,
            y: 50
        },
        width: 100,
        height: 50
    }
})

export const keys = {
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

export let idInterval;

export async function whoWins(player1, player2, idInterval) {

    clearInterval(idInterval);
    resultInfo.style.display = "flex";
    if (player1.health > player2.health) {
        resultInfo.textContent = 'Player1 wins!';
        player1Wins++;

    } else if (player1.health < player2.health) {
        resultInfo.textContent = 'Player2 wins!';
        player2Wins++;

    } else if (player1.health === player2.health) {
        resultInfo.textContent = 'Tie!';
        tie = true;
        goBack();

    }

    if (player1Wins === 1) {
        await fetch(`http://localhost:3000/warriors/create/${id1}`, {
            method: 'PATCH'
        });
        goBack();

    } else if (player2Wins === 1) {
        await fetch(`http://localhost:3000/warriors/create/${id2}`, {
            method: 'PATCH'
        });
        goBack();
    }
}

export function fightTimer() {

    if (time > 0) {
        idInterval = setTimeout(fightTimer, 1000);
        time--;
        clock.textContent = String(time);
    }

    if (time === 0) {
        endOfGame = true;
        whoWins(player, enemy, idInterval);
    }
}

fightTimer()

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3;
        enemy.switchSprite('run');

    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    if (
        rectangleCollision(player, enemy) &&
        player.isAttacking &&
        player.framesCurr === 4
    ) {
        enemy.takeHit();
        document.querySelector('.playerTwo-health-bar').style.width = enemy.health + "%";
        player.isAttacking = false;
    }

    if (player.isAttacking && player.framesCurr === 4) {
        player.isAttacking = false;
    }

    if (
        rectangleCollision(enemy, player) &&
        enemy.isAttacking &&
        enemy.framesCurr === 2
    ) {
        player.takeHit();
        document.querySelector('.playerOne-health-bar').style.width = player.health + "%";
        enemy.isAttacking = false;
    }
    if (enemy.isAttacking && enemy.framesCurr === 2) {
        enemy.isAttacking = false;
    }

    if (player.health <= 0 || enemy.health <= 0) {
        whoWins(player, enemy, idInterval);
        resultInfo.style.display = "flex";
    }
}

animate()

window.addEventListener('keydown', (e) => {

        const key = e.key;

        if (!player.isDead && !tie && !endOfGame) {
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
            }
        }
        if (!enemy.isDead && !tie && !endOfGame) {

            switch (key) {
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
        }
    }
)
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