export const loadMap = (map, canvasWidth, canvasHeight) => {
  let innerMap = {};

  if (map) {
    innerMap = JSON.parse(JSON.stringify(map));

    for (let y = 0; y < innerMap.data.length; y += 1) {
      innerMap.tileY = Math.max(innerMap.tileY, y);

      for (let x = 0; x < innerMap.data[y].length; x += 1) {
        innerMap.tileX = Math.max(innerMap.tileX, x);

        const selection = innerMap.keys.find(
          ({ id }) => id === innerMap.data[y][x]
        );

        if (selection) {
          innerMap.data[y][x] = selection;
        } else {
          [innerMap.data[y][x]] = innerMap.keys;
          console.error('loadMap: key does not exist');
        }
      }
    }

    innerMap.width = innerMap.tileX * innerMap.tileSize;
    innerMap.height = innerMap.tileY * innerMap.tileSize;

    innerMap.player.loc.x = map.player.initial.tileX * innerMap.tileSize;
    innerMap.player.loc.y = map.player.initial.tileY * innerMap.tileSize;

    innerMap.lastTile = {};
  }

  return {
    camera: {
      x: 0,
      y: 0,
    },
    map: innerMap,
    viewport: {
      x: canvasWidth,
      y: canvasHeight,
    },
  };
};
