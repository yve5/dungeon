export const SETTINGS = {
  // Default params
  background: '#333',
  tileY: 0,
  tileX: 0,
  height: 0,
  width: 0,

  jumpsSwitch: 0,

  // Default size of the tile
  tileSize: 16,

  // Default gravity of the map
  gravity: {
    x: 0,
    y: 0.3,
  },

  // Velocity limits
  velLimit: {
    x: 2,
    y: 16,
  },

  // Movement speed when the key is pressed
  movementSpeed: {
    jump: 6,
    left: 0.3,
    right: 0.3,
  },

  // The coordinates at which the player spawns and the color of the player
  player: {
    initial: { tileX: 2, tileY: 2 },
    loc: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    canJump: true,
    color: '#FF9900',
  },

  // id       [required] - an integer that corresponds with a tile in the data array.
  // color    [required] - any javascript compatible color variable.
  // solid    [optional] - whether the tile is solid or not, defaults to false.
  // bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
  // jump     [optional] - whether the player can jump while over the tile, defaults to false.
  // friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
  // gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
  // fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
  // script   [optional] - refers to a script in the scripts section, executed if it is touched.
  keys: [
    { id: 100, color: '#333', solid: 0, comment: 'empty' },
    { id: 101, color: '#888', solid: 0, comment: 'air' },
    { id: 102, color: '#777', jump: 1, comment: 'toboggan' },
    { id: 200, color: '#555', solid: 1, bounce: 0.35, comment: 'ground' },
    { id: 201, color: '#E373FA', solid: 1, bounce: 1.1 },
    { id: 202, color: '#666', solid: 1, bounce: 0 },
    {
      id: 300,
      color: 'rgba(121, 220, 242, 0.4)',
      friction: { x: 0.9, y: 0.9 },
      gravity: { x: 0, y: 0.1 },
      jump: 1,
      fore: 1,
      comment: 'water',
    },
    { id: 103, color: '#73C6FA', solid: 0, script: 'change_color' },
    { id: 104, color: '#FADF73', solid: 0, script: 'next_level' },
    { id: 105, color: '#C93232', solid: 0, script: 'death' },
    { id: 106, color: '#8F8', solid: 0 },
    { id: 107, color: '#0FF', solid: 0, script: 'unlock' },
    { id: 108, color: '#8F8', solid: 0 },
  ],
};
