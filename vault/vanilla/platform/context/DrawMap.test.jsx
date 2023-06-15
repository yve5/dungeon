import { drawMap } from './DrawMap';
import { SETTINGS } from '../resources/Settings';

const air = SETTINGS.keys[1];
const gro = SETTINGS.keys[2];
const wat = SETTINGS.keys[3];

const fakePlatform = {
  camera: {
    x: 17,
    y: 23,
  },
  map: {
    data: [
      [gro, gro, gro, gro, gro, gro, gro, gro, gro, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, gro, gro, gro, gro, wat, wat, wat, wat, gro],
      [gro, gro, gro, gro, gro, wat, wat, wat, wat, gro],
      [gro, gro, gro, gro, gro, gro, gro, gro, gro, gro],
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
  viewport: {
    x: 100,
    y: 100,
  },
};

describe('DrawMap', () => {
  it('should draw map. undefined', () => {
    const fakeContext = new canvas2dContext();

    drawMap(fakeContext, undefined);

    expect(fakeContext).toMatchSnapshot();
  });

  it('should draw map. default', () => {
    const fakeContext = new canvas2dContext();

    drawMap(fakeContext, fakePlatform);

    expect(fakeContext).toMatchSnapshot();
  });

  it('should draw map. fore', () => {
    const fakeContext = new canvas2dContext();

    drawMap(fakeContext, fakePlatform, true);

    expect(fakeContext).toMatchSnapshot();
  });
});
