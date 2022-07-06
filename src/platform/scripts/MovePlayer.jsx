const round = (value, precision = 100000) =>
  Math.round(value * precision) / precision;

const getTileContainer = (data) => (x, y) =>
  data[y] && data[y][x] ? data[y][x] : 0;

export const movePlayer = (platform, keys, limitViewport = true) => {
  let result = {};

  if (platform?.map?.player) {
    const { camera, map, viewport } = platform;

    const {
      data,
      gravity,
      height,
      jumpsSwitch,
      movementSpeed,
      player,
      tileSize,
      velLimit,
      width,
    } = map;

    const inPlayer = {
      ...player,
    };

    let inJumpsSwitch = jumpsSwitch;

    if (keys.left === true && inPlayer.vel.x > -velLimit.x) {
      inPlayer.vel.x -= movementSpeed.left;
    }

    if (keys.right === true && inPlayer.vel.x < velLimit.x) {
      inPlayer.vel.x += movementSpeed.right;
    }

    if (keys.up === true && inPlayer.canJump && inPlayer.vel.y > -velLimit.y) {
      console.log(inPlayer.vel.y);

      inPlayer.vel.y -= movementSpeed.jump;
      inPlayer.canJump = false;
    }

    const getTile = getTileContainer(data);

    const tile = getTile(
      Math.round(inPlayer.loc.x / tileSize),
      Math.round(inPlayer.loc.y / tileSize)
    );

    if (tile.gravity) {
      inPlayer.vel.x += tile.gravity.x;
      inPlayer.vel.y += tile.gravity.y;
    } else {
      inPlayer.vel.x += gravity.x;
      inPlayer.vel.y += gravity.y;
    }

    if (tile.friction) {
      inPlayer.vel.x *= tile.friction.x;
      inPlayer.vel.y *= tile.friction.y;
    }

    const tX = inPlayer.loc.x + inPlayer.vel.x;
    const tY = inPlayer.loc.y + inPlayer.vel.y;
    const offset = tileSize / 2 - 1;

    const tYUp = Math.floor(tY / tileSize);
    const tYDown = Math.ceil(tY / tileSize);
    const yNear1 = Math.round((inPlayer.loc.y - offset) / tileSize);
    const yNear2 = Math.round((inPlayer.loc.y + offset) / tileSize);
    const tXLeft = Math.floor(tX / tileSize);
    const tXRight = Math.ceil(tX / tileSize);
    const xNear1 = Math.round((inPlayer.loc.x - offset) / tileSize);
    const xNear2 = Math.round((inPlayer.loc.x + offset) / tileSize);

    const top1 = getTile(xNear1, tYUp);
    const top2 = getTile(xNear2, tYUp);
    const bottom1 = getTile(xNear1, tYDown);
    const bottom2 = getTile(xNear2, tYDown);
    const left1 = getTile(tXLeft, yNear1);
    const left2 = getTile(tXLeft, yNear2);
    const right1 = getTile(tXRight, yNear1);
    const right2 = getTile(tXRight, yNear2);

    if (tile.jump && jumpsSwitch > 15) {
      inPlayer.canJump = true;
      inJumpsSwitch = 0;
    } else {
      inJumpsSwitch += 1;
    }

    inPlayer.vel.x = Math.min(
      Math.max(inPlayer.vel.x, -velLimit.x),
      velLimit.x
    );

    inPlayer.vel.y = Math.min(
      Math.max(inPlayer.vel.y, -velLimit.y),
      velLimit.y
    );

    inPlayer.loc.x += inPlayer.vel.x;
    inPlayer.loc.y += inPlayer.vel.y;
    inPlayer.vel.x *= 0.9;

    if (left1.solid || left2.solid || right1.solid || right2.solid) {
      // fix overlap
      while (
        getTile(Math.floor(inPlayer.loc.x / tileSize), yNear1).solid ||
        getTile(Math.floor(inPlayer.loc.x / tileSize), yNear2).solid
      ) {
        inPlayer.loc.x += 0.1;
      }

      while (
        getTile(Math.ceil(inPlayer.loc.x / tileSize), yNear1).solid ||
        getTile(Math.ceil(inPlayer.loc.x / tileSize), yNear2).solid
      ) {
        inPlayer.loc.x -= 0.1;
      }

      // tile bounce
      let bounce = 0;

      if (left1.solid && left1.bounce > bounce) {
        bounce = left1.bounce;
      }

      if (left2.solid && left2.bounce > bounce) {
        bounce = left2.bounce;
      }

      if (right1.solid && right1.bounce > bounce) {
        bounce = right1.bounce;
      }

      if (right2.solid && right2.bounce > bounce) {
        bounce = right2.bounce;
      }

      inPlayer.vel.x *= -bounce || 0;
    }

    if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {
      // fix overlap
      while (
        getTile(xNear1, Math.floor(inPlayer.loc.y / tileSize)).solid ||
        getTile(xNear2, Math.floor(inPlayer.loc.y / tileSize)).solid
      ) {
        inPlayer.loc.y += 0.1;
      }

      while (
        getTile(xNear1, Math.ceil(inPlayer.loc.y / tileSize)).solid ||
        getTile(xNear2, Math.ceil(inPlayer.loc.y / tileSize)).solid
      ) {
        inPlayer.loc.y -= 0.1;
      }

      // tile bounce
      let bounce = 0;

      if (top1.solid && top1.bounce > bounce) {
        bounce = top1.bounce;
      }

      if (top2.solid && top2.bounce > bounce) {
        bounce = top2.bounce;
      }

      if (bottom1.solid && bottom1.bounce > bounce) {
        bounce = bottom1.bounce;
      }

      if (bottom2.solid && bottom2.bounce > bounce) {
        bounce = bottom2.bounce;
      }

      inPlayer.vel.y *= -bounce || 0;

      if ((bottom1.solid || bottom2.solid) && !tile.jump) {
        inPlayer.onFloor = true;
        inPlayer.canJump = true;
      }
    }

    inPlayer.loc.x = round(inPlayer.loc.x);
    inPlayer.loc.y = round(inPlayer.loc.y);
    inPlayer.vel.x = round(inPlayer.vel.x);
    inPlayer.vel.y = round(inPlayer.vel.y);

    // adjust camera
    const inCamera = {
      ...camera,
    };

    const cX = Math.round(inPlayer.loc.x - viewport.x / 2);
    const cY = Math.round(inPlayer.loc.y - viewport.y / 2);

    const xDif = Math.abs(cX - inCamera.x);
    const yDif = Math.abs(cY - inCamera.y);

    if (xDif > 5 && cX !== inCamera.x && limitViewport) {
      const mag = Math.round(Math.max(1, xDif * 0.1));

      inCamera.x = Math.max(
        0,
        Math.min(
          width - viewport.x + tileSize,
          inCamera.x + (cX > inCamera.x ? mag : -mag)
        )
      );
    }

    if (yDif > 5 && cY !== inCamera.y && limitViewport) {
      const mag = Math.round(Math.max(1, yDif * 0.1));

      inCamera.y = Math.max(
        0,
        Math.min(
          height - viewport.y + tileSize,
          inCamera.y + (cY > inCamera.y ? mag : -mag)
        )
      );
    }

    result = {
      camera: inCamera,
      map: {
        ...map,
        jumpsSwitch: inJumpsSwitch,
        player: inPlayer,
        lastTile: tile,
      },
      viewport: platform?.viewport,
    };
  }

  return result;
};
