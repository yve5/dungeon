export const handleKey = (keyCode, keys, isDown = true) => {
  let result = keys || {
    left: false,
    up: false,
    right: false,
  };

  switch (keyCode) {
    case 37:
      result = {
        ...result,
        left: isDown,
      };
      break;

    case 32:
    case 38:
      result = {
        ...result,
        up: isDown,
      };
      break;

    case 39:
      result = {
        ...result,
        right: isDown,
      };
      break;

    default:
      break;
  }

  return result;
};
