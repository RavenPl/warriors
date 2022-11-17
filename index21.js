// const canvas = document.querySelector('canvas');
// const context = canvas.getContext('2d');
// const clock = document.querySelector('.clock');
// const resultInfo = document.querySelector('.resultInfo');
//
// canvas.width = 1024;
// canvas.height = 576;
//
// context.fillRect(0, 0, canvas.width, canvas.height); /* tworzymy nasz prostokąt podajac rozmiary*/
//
// const gravity = 0.2;
//
// function rectangleCollision(rectangle1, rectangle2) {
//     return (
//         rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
//         rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
//         rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
//         rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
//     )
// }
//
// class Sprite {
//
//     height = 150;
//     width = 50;
//     image = new Image();
//
//
//     constructor({position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
//
//         this.position = position;
//         this.image.src = imgSrc;
//         this.scale = scale;
//         this.framesMax = framesMax;
//         this.framesCurr = 0;
//         this.framesElapsed = 0;
//         this.framesHold = 5;
//         this.offset = offset;
//     }
//
//     draw() {
//         context.drawImage(
//             this.image,
//             this.framesCurr * (this.image.width / this.framesMax),
//             0,
//             this.image.width / this.framesMax,
//             this.image.height,
//             this.position.x - this.offset.x,
//             this.position.y - this.offset.y,
//             (this.image.width / this.framesMax) * this.scale,
//             this.image.height * this.scale
//         )
//     }
//
//     animateFrames() {
//         this.framesElapsed++;
//         if (this.framesElapsed % this.framesHold === 0) {
//             if (this.framesCurr < this.framesMax - 1) {
//                 this.framesCurr++
//             } else {
//                 this.framesCurr = 0
//             }
//         }
//     }
//
//     update() {
//         this.draw();
//         this.animateFrames()
//     }
// }
//
// class Warrior extends Sprite {
//
//     height = 150;
//     width = 50;
//     lastKey;
//     isAttacking;
//     health = 100;
//     isDead = false;
//
//     constructor({
//                     position,
//                     velocity,
//                     color = 'red',
//                     imgSrc,
//                     scale,
//                     framesMax,
//                     offset,
//                     sprites,
//                     attackBox = {offset: {}, width: undefined, height: undefined}
//                 }) {
//
//         super({
//             position, imgSrc, scale, framesMax, offset
//         })
//         this.velocity = velocity;
//         this.attackBox = {
//             position: {
//                 x: this.position.x,
//                 y: this.position.y
//             },
//             offset: attackBox.offset,
//             width: attackBox.width,
//             height: attackBox.height,
//         };
//         this.color = color;
//         this.framesCurr = 0;
//         this.framesElapsed = 0;
//         this.framesHold = 5;
//         this.sprites = sprites;
//
//         for (const sprite in this.sprites) {
//             sprites[sprite].image = new Image();
//             sprites[sprite].image.src = sprites[sprite].imgSrc
//
//         }
//     }
//
//     attack() {
//         this.isAttacking = true;
//         this.switchSprite('attack');
//     }
//
//     takeHit() {
//         this.health -= 10;
//         if (this.health <= 0) {
//             this.switchSprite('death');
//         }
//         this.switchSprite('take_hit');
//     }
//
//     // ta funkcja jest odpowiedzialana za nasza animacje, za ruch
//     update() {
//
//         this.draw();
//         if (!this.isDead) {
//             this.animateFrames()
//         }
//
//         this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
//         this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
//
//         this.position.y += this.velocity.y;
//         this.position.x += this.velocity.x;
//
//         if (this.position.y + this.height + this.velocity.y >= canvas.height - 60) {
//             this.velocity.y = 0;
//             this.position.y = 366;
//             // console.log(this.position.y);
//         } else {
//             this.velocity.y += gravity;
//         }
//     }
//
//     switchSprite(sprite) {
//         if (this.image === this.sprites.death.image) {
//             if (this.framesCurr === this.sprites.death.framesMax - 1) {
//                 this.isDead = true;
//             }
//             return
//         }
//
//         if (this.image === this.sprites.attack.image && this.framesCurr < this.sprites.attack.framesMax - 1) return
//         if (this.image === this.sprites.take_hit.image && this.framesCurr < this.sprites.take_hit.framesMax - 1) return
//         switch (sprite) {
//             case 'idle' :
//                 if (this.image !== this.sprites.idle.image) {
//                     this.image = this.sprites.idle.image
//                     this.framesMax = this.sprites.idle.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//             case 'run' :
//                 if (this.image !== this.sprites.run.image) {
//                     this.image = this.sprites.run.image;
//                     this.framesMax = this.sprites.run.framesMax;
//                     this.framesCurr = 0;
//
//                 }
//                 break;
//             case 'jump' :
//                 if (this.image !== this.sprites.jump.image) {
//                     this.image = this.sprites.jump.image;
//                     this.framesMax = this.sprites.jump.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//             case 'fall' :
//                 if (this.image !== this.sprites.fall.image) {
//                     this.image = this.sprites.fall.image;
//                     this.framesMax = this.sprites.fall.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//             case 'attack' :
//                 if (this.image !== this.sprites.attack.image) {
//                     this.image = this.sprites.attack.image;
//                     this.framesMax = this.sprites.attack.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//             case 'take_hit' :
//                 if (this.image !== this.sprites.take_hit.image) {
//                     this.image = this.sprites.take_hit.image;
//                     this.framesMax = this.sprites.take_hit.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//             case 'death' :
//                 if (this.image !== this.sprites.death.image) {
//                     this.image = this.sprites.death.image;
//                     this.framesMax = this.sprites.death.framesMax;
//                     this.framesCurr = 0;
//                 }
//                 break;
//         }
//     }
// }
//
// const background = new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     imgSrc: "./img/background.png"
// })
//
// // const shop = new Sprite({
// //     position: {
// //         x: 755,
// //         y: 255
// //     },
// //     scale: 2,
// //     imgSrc: "./img/shop.png",
// //     framesMax: 6
// // })
//
// const player = new Warrior({
//     position: {
//         x: 100,
//         y: 0
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     },
//     imgSrc: "./img/Warrior1/Idle.png",
//     framesMax: 10,
//     scale: 2.5,
//     offset: {
//         x: 150,
//         y: 55
//     },
//     sprites: {
//         idle: {
//             imgSrc: "./img/Warrior1/Idle.png",
//             framesMax: 10,
//         },
//         run: {
//             imgSrc: "./img/Warrior1/Run.png",
//             framesMax: 8,
//         },
//         jump: {
//             imgSrc: "./img/Warrior1/Jump.png",
//             framesMax: 3,
//         },
//         fall: {
//             imgSrc: "./img/Warrior1/Fall.png",
//             framesMax: 3,
//         },
//         attack: {
//             imgSrc: "./img/Warrior1/Attack.png",
//             framesMax: 7,
//         },
//         take_hit: {
//             imgSrc: "./img/Warrior1/Take hit.png",
//             framesMax: 3,
//         },
//         death: {
//             imgSrc: "./img/Warrior1/Death.png",
//             framesMax: 11,
//         }
//     },
//     attackBox: {
//         offset: {
//             x: 50,
//             y: 50
//         },
//         width: 50,
//         height: 50
//     }
//
// })
//
// const enemy = new Warrior({
//     position: {
//         x: 800,
//         y: 0
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     },
//     offset: {
//         x: 215,
//         y: 235
//     },
//     imgSrc: "./img/Warrior2/Idle.png",
//     framesMax: 4,
//     scale: 3,
//
//     sprites: {
//         idle: {
//             imgSrc: "./img/Warrior2/Idle.png",
//             framesMax: 4,
//         },
//         run: {
//             imgSrc: "./img/Warrior2/Run.png",
//             framesMax: 8,
//         },
//         jump: {
//             imgSrc: "./img/Warrior2/Jump.png",
//             framesMax: 2,
//         },
//         fall: {
//             imgSrc: "./img/Warrior2/Fall.png",
//             framesMax: 2,
//         },
//         attack: {
//             imgSrc: "./img/Warrior2/Attack.png",
//             framesMax: 4,
//         },
//         take_hit: {
//             imgSrc: "./img/Warrior2/Take hit.png",
//             framesMax: 3,
//         },
//         death: {
//             imgSrc: "./img/Warrior2/Death.png",
//             framesMax: 7,
//         }
//     },
//     attackBox: {
//         offset: {
//             x: -140,
//             y: 50
//         },
//         width: 100,
//         height: 50
//     }
// })
//
// const keys = {
//     a: {
//         pressed: false
//     },
//     d: {
//         pressed: false
//     },
//     ArrowRight: {
//         pressed: false
//     },
//     ArrowLeft: {
//         pressed: false
//     },
// }
//
// let time = 60;
// let idInterval;
//
// function whoWins({player1, player2, idInterval}) {
//
//     clearInterval(idInterval);
//     resultInfo.style.display = "flex";
//     if (player1.health > player2.health) {
//         resultInfo.textContent = 'Player1 wins!';
//     } else if (player1.health < player2.health) {
//         resultInfo.textContent = 'Player2 wins!';
//     } else if (player1.health === player2.health) {
//         resultInfo.textContent = 'Tie!';
//     }
// }
//
// function fightTimer() {
//
//     if (time > 0) {
//         idInterval = setTimeout(fightTimer, 1000);
//         time--;
//         clock.textContent = String(time);
//     }
//
//     if (time === 0) {
//         whoWins({player1: player, player2: enemy, idInterval});
//     }
//
// }
//
// fightTimer()
//
// /* tworzymy petlę animacji. dajac animate() do funkcji window.requestAnimationFrame() tworzymy petle
// animacji
//
// * */
// function animate() {
//     window.requestAnimationFrame(animate);
//     context.fillStyle = 'black';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     background.update();
//     // shop.update();
//
//     player.update();
//     enemy.update();
//
//     player.velocity.x = 0;
//     enemy.velocity.x = 0;
//
//     // player1 movement
//
//
//     if (keys.a.pressed && player.lastKey === 'a') {
//         player.velocity.x = -3;
//         player.switchSprite('run');
//     } else if (keys.d.pressed && player.lastKey === 'd') {
//         player.velocity.x = 3;
//         player.switchSprite('run');
//     } else {
//         player.switchSprite('idle');
//     }
//
//     if (player.velocity.y < 0) {
//         player.switchSprite('jump');
//     } else if (player.velocity.y > 0) {
//         player.switchSprite('fall');
//     }
//
//     // player2 movement
//     if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
//         enemy.velocity.x = -3;
//         enemy.switchSprite('run');
//
//     } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
//         enemy.velocity.x = 3;
//         enemy.switchSprite('run');
//
//     } else {
//         enemy.switchSprite('idle');
//     }
//     if (enemy.velocity.y < 0) {
//         enemy.switchSprite('jump');
//     } else if (enemy.velocity.y > 0) {
//         enemy.switchSprite('fall');
//     }
//
//     // detecting collisions
//     if (
//         rectangleCollision(player, enemy) &&
//         player.isAttacking &&
//         player.framesCurr === 4
//     ) {
//         enemy.takeHit();
//         document.querySelector('.playerTwo-health-bar').style.width = enemy.health + "%";
//         player.isAttacking = false;
//     }
//
//     // missing collision
//     if (player.isAttacking && player.framesCurr === 4) {
//         player.isAttacking = false;
//     }
//
//     if (
//         rectangleCollision(enemy, player) &&
//         enemy.isAttacking &&
//         enemy.framesCurr === 2
//     ) {
//         player.takeHit();
//         document.querySelector('.playerOne-health-bar').style.width = player.health + "%";
//         enemy.isAttacking = false;
//     }
//     if (enemy.isAttacking && enemy.framesCurr === 2) {
//         enemy.isAttacking = false;
//     }
// // sprawdzanie kto wygral gdy zycie jest ponizej 0
//
//     if (player.health <= 0 || enemy.health <= 0) {
//         whoWins({player1: player, player2: enemy, idInterval});
//         resultInfo.style.display = "flex";
//     }
// }
//
//
// animate()
//
// window.addEventListener('keydown', (e) => {
//
//         const key = e.key;
//
//         if (!player.isDead) {
//             switch (key) {
//                 case 'd' :
//                     keys.d.pressed = true;
//                     player.lastKey = 'd';
//                     break;
//                 case 'a' :
//                     keys.a.pressed = true;
//                     player.lastKey = 'a';
//                     break;
//                 case 'w' :
//                     player.velocity.y = -10;
//                     break;
//                 case ' ' :
//                     player.attack();
//                     break;
//             }
//         }
//         if (!enemy.isDead) {
//
//             switch (key) {
//                 case 'ArrowRight' :
//                     keys.ArrowRight.pressed = true;
//                     enemy.lastKey = 'ArrowRight';
//                     break;
//                 case 'ArrowLeft' :
//                     keys.ArrowLeft.pressed = true;
//                     enemy.lastKey = 'ArrowLeft';
//                     break;
//                 case 'ArrowUp' :
//                     enemy.velocity.y = -10;
//                     break;
//                 case 'ArrowDown' :
//                     enemy.attack()
//                     break;
//             }
//         }
//     }
// )
// window.addEventListener('keyup', (e) => {
//
//     const key = e.key;
//
//     switch (key) {
//         case 'd' :
//             keys.d.pressed = false;
//             break;
//         case 'a' :
//             keys.a.pressed = false;
//             break;
//
//         case 'ArrowLeft' :
//             keys.ArrowLeft.pressed = false;
//             break;
//         case 'ArrowRight' :
//             keys.ArrowRight.pressed = false;
//             break;
//     }
// })