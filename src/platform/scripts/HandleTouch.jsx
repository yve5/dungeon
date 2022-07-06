export const handleTouch = (clientX, clientY, initialPositions) => {
  let result = {
    left: false,
    up: false,
    right: false,
  };

  if (clientX && clientY && initialPositions?.x && initialPositions?.y) {
    if (initialPositions.y > clientY + 5) {
      result = {
        ...result,
        up: true,
      };
    }

    if (initialPositions.x > clientX) {
      result = {
        ...result,
        left: true,
      };
    }

    if (initialPositions.x < clientX) {
      result = {
        ...result,
        right: true,
      };
    }
  }

  return result;
};
