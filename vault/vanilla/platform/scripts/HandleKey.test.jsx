import { handleKey } from './HandleKey';

describe('HandleKey actions', () => {
  it('should handle key. undefined', () => {
    expect(handleKey(undefined)).toEqual({
      left: false,
      up: false,
      right: false,
    });
  });

  it('should handle key. left', () => {
    expect(
      handleKey(37, {
        left: false,
        up: true,
        right: false,
      })
    ).toEqual({
      left: true,
      up: true,
      right: false,
    });
  });

  it('should handle key. arrow up', () => {
    expect(handleKey(38)).toEqual({
      left: false,
      up: true,
      right: false,
    });
  });

  it('should handle key. space up & handleKeyUp', () => {
    expect(
      handleKey(
        32,
        {
          left: false,
          up: true,
          right: false,
        },
        false
      )
    ).toEqual({
      left: false,
      up: false,
      right: false,
    });
  });

  it('should handle key. right', () => {
    expect(handleKey(39)).toEqual({
      left: false,
      up: false,
      right: true,
    });
  });

  it('should handle key. right', () => {
    expect(
      handleKey(39, {
        left: false,
        up: true,
        right: false,
      })
    ).toEqual({
      left: false,
      up: true,
      right: true,
    });
  });
});
