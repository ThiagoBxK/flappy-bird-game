const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

function Game(fps = 60) {
  const sprites = {};
  const images = {
    background: 'background.jpg',
    floor: 'floor.jpg',
    bird: 'bird.png',
    touch: 'touch.png',
    gameover: 'gameover.png',
  };
  
  for (let key in images) {
    sprites[key] = new Image();
    sprites[key].src = `./sprites/${images[key]}`;
  };

  let score = 0;
  let scenarioSpeed = 0;
  let frames = 0;
  let speed = 1;
  let screen = 'home';
  
  const Bird = {
    sprite: 0,
    posY: 250,
    speed: 1,
    gravity: 0.5,
    click() {
      if (screen !== 'started') return;

      this.speed = -7;
      this.draw();
    },
    draw() {
      context.drawImage(
        sprites.bird,
        64 * this.sprite, 0,
        64, 64, 
        20, this.posY,
        48, 48
      );
    },
    update() {
      this.draw();

      // Colisão
      if (this.posY + 48 >= canvas.height - 100 - speed)
        return screen = 'gameover';
      
      // Mudar sprite do pássaro
      if (this.sprite >= 2) this.sprite = 0;
      if (frames % 12 === 0) this.sprite++;
      
      // Gravidade
      this.speed += this.gravity;
      this.posY += this.speed;
    }
  };
  
  // Desenhar na tela
  const Draw = {
    background() {
      context.drawImage(
        sprites.background,
        scenarioSpeed, 0,
        canvas.width, canvas.height,
        0, 0,
        canvas.width, canvas.height
      );
    },
    floor() {
      context.drawImage(
        sprites.floor,
        scenarioSpeed * -1, canvas.height - 110,
        sprites.floor.width, 110
      );
    },
    scoreboard() {
      // Dependendo da velocidade o score vai subir mais rápido
      if (frames % (60 / speed) === 0) score++;
      
      context.font = "36px 'Press Start 2P'";
      context.fillStyle = 'white'; 
      context.fillText(score, (canvas.width / 2) - (context.measureText(score).width / 2), 72);
    },
    touch() {
      context.drawImage(
        sprites.touch,
        0, 0,
        124, 210, 
        canvas.width / 2 - 37.5, canvas.height / 3,
        75, 127
      );
    }
  }; 

  const Gameover = {
    handle() {
      Draw.background();
      Draw.floor();
      
      context.drawImage(
        sprites.gameover,
        0, 0,
        700, 500, 
        (canvas.width / 2) - 105, canvas.height / 4 - 75,
        210, 150
      );
    }
  };

  const Home = {
    countdown: 4 * fps,
    handle() {
      Draw.background();
      Draw.floor();
      Bird.draw();
      
      if (screen == 'home') Draw.touch();
    },
    timer() {
      this.countdown--;
      this.handle();

      const text = this.countdown <= 60 ? 'Start' : parseInt(this.countdown / 60);
      
      context.font = this.countdown <= 60 ? "28px 'Press Start 2P'" : "48px 'Press Start 2P'";
      context.fillStyle = 'white'; 
      context.fillText(text, (canvas.width / 2) - (context.measureText(text).width / 2), 124);
      
      if (this.countdown !== 0) {
        requestAnimationFrame(this.timer.bind(this));
      } else {
        screen = 'started';
        Game.start();
      }
    },
    click() {
      screen = 'timer';
      this.timer();
    }
  };

  const Game = {
    update() {
      if (screen == 'gameover') return Gameover.handle();

      // Efeito de cenario infinito
      if (scenarioSpeed >= canvas.width - 16) scenarioSpeed = 24;

      frames++;
      scenarioSpeed += speed;
      
      Draw.background();
      Draw.floor();
      Draw.scoreboard();
      Bird.update();
      
      setTimeout(() => {
        requestAnimationFrame(this.update.bind(this));
      }, 1000 / fps);
    },
    reset() {
      score = 0;
      scenarioSpeed = 0;
      frames = 0;
      speed = 1;

      Bird.sprite = 0;
      Bird.posY = 250;
      Bird.speed = 10;
      Bird.gravity = 0.5;
      Home.countdown = 4 * fps;
    },
    start() {
      screen = 'started';

      this.reset();
      this.update();
    },
    run() {
      sprites.touch.onload = () => Home.handle();
      
      // Eventos de click tela ou teclado
      document.body.addEventListener('click', () => {
        if (screen == 'home') Home.click();
        // Quando estiver na tela gameover é o usuario clicar ele ira para tela inicial
        else if (screen == 'gameover') {
          this.reset();
          screen = 'home';
          setTimeout(() => {
            Home.handle();
          }, 100);
        }
        else if (screen == 'started') Bird.click();
      });

      document.body.addEventListener('keydown', (key) => {
        if (screen == 'started' && key.keyCode == 32) {
          Bird.click();
        }
      });
    }
  }

  return Game;
};

window.onload = function() {
  Game().run();
};