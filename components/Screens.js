import Bird from "./Bird.js";
import { Background, Floor, Scoreboard, Touch } from "./Scenarios.js";

const canvas = document.getElementById("game");

const Screens = {
   currentScreen: undefined,
   render() {
      Background.draw();
      Floor.draw();
      Scoreboard.draw();
   },
   Home: {
      render() {
         Screens.currentScreen = 'home';

         Screens.render();
         Touch.draw();
         Bird.draw();
      }
   },
   Gameover: {
      render() {
         Screens.currentScreen = 'gameover';
         Bird.posY = canvas.height - Floor.height - 36;

         Screens.render();
         Bird.draw();
      }
   }
};

export default Screens;