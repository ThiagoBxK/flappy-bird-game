const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const Background = {
  image: undefined,
  draw() {
    context.drawImage(
      this.image,
      0, 0,
      canvas.width, canvas.height,
      0, 0,
      canvas.width, canvas.height
    );
  }
};

const Floor = {
  image: undefined,
  height: 100,
  draw() {
    context.drawImage(
      this.image,
      0, canvas.height - this.height,
      this.image.width, this.height,
    );
  },
  colision(posY, gravitySpeed) {
    const calc = (posY + gravitySpeed + 32) >= (canvas.height - this.height);

    return calc;
  },
};

const Scoreboard = {
  score: 0,
  draw() {
    context.font = "36px 'Press Start 2P'";
    context.fillStyle = 'white';

    context.fillText(this.score, (canvas.width / 2) - (context.measureText(this.score).width / 2), 72);
  },
  update() {
    this.score++;
    this.draw();
  }
};

const Touch = {
  image: undefined,
  width: 124,
  height: 210,
  scale: 1.25,
  draw(a) {
    context.drawImage(
      this.image,
      0, 0,
      this.width, this.height,
      (canvas.width - this.width / this.scale) / 2, (canvas.height - this.height / this.scale) / 2,
      (this.width / this.scale), (this.height / this.scale)
    );
  }
};

export {
  Background, Floor, Scoreboard, Touch
}