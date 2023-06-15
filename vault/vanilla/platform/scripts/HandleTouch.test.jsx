import { handleTouch } from './HandleTouch';

describe('handleTouch actions', () => {
  xit('should handle key. undefined', () => {
    expect(handleTouch(undefined)).toEqual({
      left: false,
      up: false,
      right: false,
    });

    expect(handleTouch(200, 100, undefined)).toEqual({
      left: false,
      up: false,
      right: false,
    });
  });

  xit('should handle key. left', () => {
    expect(handleTouch(200, 100, { x: 215, y: 100 })).toEqual({
      left: true,
      up: false,
      right: false,
    });
  });

  xit('should handle key. up', () => {
    expect(handleTouch(200, 100, { x: 200, y: 140 })).toEqual({
      left: false,
      up: true,
      right: false,
    });
  });

  xit('should handle key. right', () => {
    expect(handleTouch(200, 100, { x: 184, y: 100 })).toEqual({
      left: false,
      up: false,
      right: true,
    });
  });
});
