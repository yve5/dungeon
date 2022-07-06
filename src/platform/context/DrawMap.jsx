export const drawMap = (context, platform, fore = false) => {
  if (platform?.viewport?.x) {
    const {
      map: { data, tileSize },
      camera,
      viewport,
    } = platform;

    for (let y = 0; y < data.length; y += 1) {
      for (let x = 0; x < data[y].length; x += 1) {
        if ((!fore && !data[y][x]?.fore) || (fore && data[y][x]?.fore)) {
          const relativeX = x * tileSize - camera.x;
          const relativeY = y * tileSize - camera.y;

          if (
            relativeX > -tileSize &&
            relativeY > -tileSize &&
            relativeX < viewport.x &&
            relativeY < viewport.y
          ) {
            context.fillStyle = data[y][x].color;
            context.fillRect(relativeX, relativeY, tileSize, tileSize);
          }
        }
      }
    }
  }
};
