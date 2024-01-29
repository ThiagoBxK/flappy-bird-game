import Bird from "./components/Bird.js";
import Game from "./components/Game.js";
import Pipe from "./components/Pipe.js";
import { Background, Floor, Touch } from "./components/Scenarios.js";
import Screens from "./components/Screens.js";
import { getSprites } from "./functions.js";

const canvas = document.getElementById("game");

const images = {
  background: `background.jpg`,
  floor: `floor.jpg`,
  pipe: `pipe.png`,
  bird: `bird.png`,
  touch: `touch.png`
};

function handleEvents() {
  if (!Screens.currentScreen || Screens.currentScreen === 'home')
    Game.start();
  else if (Screens.currentScreen === 'started')
    Bird.flap();
  else if (Screens.currentScreen === 'gameover')
    Game.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  const render = async () => {
    const { background, floor, pipe, bird, touch } = await getSprites(images);

    Background.image = background;
    Floor.image = floor;
    Bird.image = bird;
    Pipe.image = pipe;
    Touch.image = touch;

    Screens.Home.render(bird);
  }

  canvas.addEventListener('click', () => handleEvents());
  document.addEventListener('keydown', (key) => key.code === 'Space' ? handleEvents() : null);

  render();
});
