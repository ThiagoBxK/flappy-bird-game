import Bird from "./Bird.js";
import { Floor } from "./Scenarios.js";
import Screens from "./Screens.js";

class Game {
   constructor() { this.interval; }

   static reset() {
      Bird.spriteIndex = 0;
      Bird.posY = 200;
      Bird.gravity = 0.5;
      Bird.gravitySpeed = -5;

      Screens.Home.render();
   }

   static start() {
      Screens.currentScreen = 'started';

      this.interval = setInterval(() => {
         if (Floor.colision(Bird.posY, Bird.gravitySpeed)) {
            clearInterval(this.interval)
            return Screens.Gameover.render();
         };

         Screens.render();
         Bird.update();
      }, 1000 / 60)
   }
}

export default Game;