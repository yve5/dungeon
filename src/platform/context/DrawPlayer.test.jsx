import { drawPlayer } from './DrawPlayer';

describe('drawPlayer', () => {
  it('should draw player. undefined', () => {
    const fakeContext = new canvas2dContext();

    drawPlayer(fakeContext, undefined);

    expect(fakeContext).toMatchSnapshot();
  });

  it('should draw player. default', () => {
    const fakeContext = new canvas2dContext();

    drawPlayer(fakeContext, {
      camera: {
        x: 16,
        y: 16,
      },
      map: {
        data: [
          [2, 2, 2, 2, 2],
          [2, 1, 1, 1, 2],
          [2, 1, 1, 1, 2],
          [2, 1, 1, 1, 2],
          [2, 2, 2, 2, 2],
        ],
        tileSize: 16,
        player: {
          color: '#FF9900',
          loc: {
            x: 16,
            y: 16,
          },
        },
      },
    });

    expect(fakeContext).toMatchSnapshot();
  });
});
