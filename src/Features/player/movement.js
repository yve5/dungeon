import store from '../../config/store';
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants';

export default function handMovement(player) {

  function getNewPosition(oldPos, direction) {
    let output;

    if (direction === 'WEST') {
      output = [oldPos[0] - SPRITE_SIZE, oldPos[1]];
    } else if (direction === 'EAST') {
      output = [oldPos[0] + SPRITE_SIZE, oldPos[1]];
    } else if (direction === 'NORTH') {
      output = [oldPos[0], oldPos[1] - SPRITE_SIZE];
    } else if (direction === 'SOUTH') {
      output = [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }

    return output;
  }

  function getSpriteLocation(direction, walkIndex) {
    let output;

    if (direction === 'SOUTH') {
      output = `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    } else if (direction === 'EAST') {
      output = `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
    } else if (direction === 'WEST') {
      output = `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
    } else if (direction === 'NORTH') {
      output = `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    }

    return output;
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(newPos) {
    return (newPos[0] >= 0 && newPos[0] <= (MAP_WIDTH - SPRITE_SIZE)) &&
      (newPos[1] >= 0 && newPos[1] <= (MAP_HEIGHT - SPRITE_SIZE));
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();

    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      }
    })
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if (observeBoundaries(newPos) && observeImpassable(oldPos, newPos)) {
      dispatchMove(direction, newPos);
    }
  }

  function handleKeyDown(eve) {
    eve.preventDefault();
    let output;

    if (eve.keyCode === 37) {
      output = attemptMove('WEST');
    } else if (eve.keyCode === 38) {
      output = attemptMove('NORTH');
    } else if (eve.keyCode === 39) {
      output = attemptMove('EAST');
    } else if (eve.keyCode === 40) {
      output = attemptMove('SOUTH');
    }

    return output;
  }

  window.addEventListener('keydown', (eve) => {
    handleKeyDown(eve);
  })

  return player;
}