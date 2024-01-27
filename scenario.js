const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

export const Background = {
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

export const Floor = {
  image: undefined,
  height: 100,
  draw() {
    context.drawImage(
      this.image,
      0, canvas.height - this.height,
      this.image.width, this.height,
    );
  }
};

export const Scoreboard = {
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