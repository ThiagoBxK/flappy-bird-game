const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

import { Background, Floor, Scoreboard } from './scenario.js';
import { getSprites } from './functions.js';

const Bird = {
  image: null,
  spriteIndex: 0,
  posY: 200,
  gravity: 0.3,
  gravitySpeed: -5,
  cutSize: 64, // Tamanho do recorte
  size: 48, // Tamanho que vai ser mostrado na tela
  floorColision() {
    const floor = (this.posY + this.gravitySpeed + 32) >= (canvas.height - Floor.height);

    if (floor) {
      Game.currentScreen = 'gameover';
      this.posY = canvas.height - Floor.height - 34;
    }

    return floor;
  },
  draw() {
    context.drawImage(
      this.image,
      this.cutSize * this.spriteIndex, 0,
      this.cutSize, this.cutSize,
      20, this.posY,
      this.size, this.size
    );
  },
  click() {
    this.gravitySpeed = -7;
  },
  update(frames) {
    if (Game.currentScreen === 'gameover') return this.draw();

    if (this.floorColision()) return;

    // Pipe Colisão

    // Muda o sprite do pássaro
    if (frames % 12 === 0) this.spriteIndex++
    if (this.spriteIndex >= 3) this.spriteIndex = 0;

    // Gravidade
    this.gravitySpeed += this.gravity;
    this.posY += this.gravitySpeed;

    this.draw();
  }
}


const Game = {
  interval: undefined,
  fps: 60,
  frames: 0,
  gameOver: false,
  currentScreen: undefined,
  start() {
    this.currentScreen = 'playing';

    this.update();
  },
  render: async () => {
    const { background, floor, bird } = await getSprites();

    Background.image = background;
    Floor.image = floor;
    Bird.image = bird;

    Background.draw();
    Floor.draw();
    Bird.draw();
  },
  update() {
    if (this.currentScreen === 'gameover') {
      clearInterval(this.interval)

      console.log(`Voçê morreu com ${this.frames}`)
      return;
    }

    this.frames++;

    Background.draw();
    Floor.draw();
    Bird.update(this.frames);
    Scoreboard.draw();

    this.interval = setTimeout(() => this.update(), 1000 / this.fps);
  }
};


window.onload = () => {
  Game.render();

  setTimeout(() => {
    if (!Game.currentScreen) Game.start();
  }, 100);

  document.body.addEventListener('click', () => {
    if (!Game.currentScreen) Game.start();
    else if (Game.currentScreen === 'playing') Bird.click();
  });
}