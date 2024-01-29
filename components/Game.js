import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import { Floor, Scoreboard } from "./Scenarios.js";
import Screens from "./Screens.js";

const canvas = document.getElementById("game");

class Game {
   constructor() {
      this.interval;
      this.frames = 0;
   }

   static reset() {
      Bird.spriteIndex = 0;
      Bird.posY = 200;
      Bird.gravity = 0.5;
      Bird.gravitySpeed = -5;

      Pipe.reset();
      Screens.Home.render();
   }

   static start() {
      let { frames } = new this;
      Screens.currentScreen = 'started';

      this.interval = setInterval(() => {
         if (Floor.colision(Bird.posY, Bird.gravitySpeed)) {
            clearInterval(this.interval);
            Bird.posY = canvas.height - Floor.height - 36;
            return Screens.Gameover.render();
         }

         frames++;
         if (frames % 100 === 0) Scoreboard.score++;

         Screens.render(frames);
         Bird.update();

      }, 1000 / 60)
   }
}

export default Game;