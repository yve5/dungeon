import { loadMap } from './LoadMap';
import { SETTINGS } from '../resources/Settings';

const findKey = (target) => SETTINGS.keys.find(({ id }) => id === target);

const empty = findKey(1);
const air = findKey(2);
const ground = findKey(3);
const end = findKey(9);

beforeEach(() => {
  console.error = jest.fn();
});

describe('LoadMap actions', () => {
  it('should handle PLATFORM_LOAD_MAP. undefined', () => {
    expect(loadMap(undefined)).toEqual({
      camera: { x: 0, y: 0 },
      viewport: { x: undefined, y: undefined },
      map: {},
    });
  });

  it('should handle PLATFORM_LOAD_MAP. default', () => {
    expect(
      loadMap(
        {
          ...SETTINGS,
          data: [
            [3, 3, 3],
            [3, 2, 3, 3, 3],
            [3, 2, 2, 2, 3],
            [3, 2, 2, 9, 3],
            [3, 3, 3, 3, 3, 42],
          ],
        },
        800,
        450
      )
    ).toEqual({
      camera: { x: 0, y: 0 },
      viewport: { x: 800, y: 450 },
      map: {
        ...SETTINGS,
        data: [
          [ground, ground, ground],
          [ground, air, ground, ground, ground],
          [ground, air, air, air, ground],
          [ground, air, air, end, ground],
          [ground, ground, ground, ground, ground, empty],
        ],
        tileY: 4,
        tileX: 5,
        height: 64,
        width: 80,
        player: {
          ...SETTINGS.player,
          loc: { x: 32, y: 32 },
        },
        lastTile: {},
      },
    });
  });
});
