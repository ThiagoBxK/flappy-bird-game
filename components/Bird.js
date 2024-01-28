const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const Bird = {
   image: undefined,
   spriteIndex: 0,
   posY: 200,
   gravity: 0.5,
   gravitySpeed: - 5,
   cutSize: 64,
   size: 50,
   draw() {
      context.drawImage(
         this.image,
         this.cutSize * this.spriteIndex, 0,
         this.cutSize, this.cutSize,
         20, this.posY,
         this.size, this.size
      );
   },
   update() {
      this.gravitySpeed += this.gravity;
      this.posY += this.gravitySpeed;

      this.draw();
   },
   flap() {
      this.gravitySpeed = -7
   }
}

export default Bird;