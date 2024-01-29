const canvas = document.getElementById("game");
const context = canvas.getContext('2d');

class Pipe {
   constructor() {
      this.image = undefined;
      this.pipeList = [];
      this.speed = 1;

      this.createPipe();
   }

   reset() {
      this.pipeList = [];
      this.createPipe();
   }

   draw(pipe) {
      context.drawImage(
         this.image,
         pipe.posX, pipe.posY,
         canvas.width, canvas.height,
         0, 0,
         canvas.width, canvas.height
      );
   }

   updateAll() {
      if (this.pipeList[0].posX === 100) {
         this.pipeList.shift();
      }

      this.pipeList = this.pipeList.map(pipe => {
         this.draw(pipe);

         return {
            posX: pipe.posX = pipe.posX + 1,
            posY: pipe.posY,
            colision: {
               top: 0 - pipe.posY - 40 + (canvas.height - 136),
               bottom: 0 - pipe.posY - 40 + (canvas.height + 136)
            }
         }
      });
   }

   createPipe() {
      this.pipeList.push({
         posX: (canvas.width * -1),
         posY: Math.floor(Math.random() * (300 - 150 + 1)) + 150,
      });
   }
}

export default new Pipe;