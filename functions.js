const images = {
  background: `background.jpg`,
  floor: `floor.jpg`,
  bird: `bird.png`,
  touch: `touch.png`
};

export function getSprites() {
  const sprites = Object.keys(images).map(key => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = `./sprites/${images[key]}`;

      image.onload = () => resolve({
        [key]: image
      });

      image.onerror = (err) => reject(err);
    });
  });

  return Promise.all(sprites)
    .then(array => Object.assign({}, ...array))
    .catch(err => {
      console.err(`getSprites() error:${err}`);
    });
}
