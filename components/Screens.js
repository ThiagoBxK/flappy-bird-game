import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import { Background, Floor, Scoreboard, Touch } from "./Scenarios.js";

const Screens = {
   currentScreen: undefined,
   render(frames) {
      Background.draw(frames);

      if (frames % 200 === 0) Pipe.createPipe();
      Pipe.updateAll();

      Floor.draw(frames);
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

         Screens.render(0);
         Bird.draw();
      }
   }
};

export default Screens;