import { Scene } from 'phaser';

import Player from '../resources/Player';
import { SCENE_MAIN } from '../resources/constants';

const { REACT_APP_MATTER_ASSETS_PATH: assetsPath } = process.env;

class Main extends Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  preload() {
    this.load.tilemapTiledJSON('map', `${assetsPath}/tilemaps/level.json`);
    this.load.image(
      'kenney-tileset-64px-extruded',
      `${assetsPath}/tilesets/kenney-tileset-64px-extruded.png`
    );

    this.load.image('block', `${assetsPath}/images/block.png`);
    this.load.image('wooden-plank', `${assetsPath}/images/wooden-plank.png`);

    this.load.atlas(
      'emoji',
      `${assetsPath}/atlases/emoji.png`,
      `${assetsPath}/atlases/emoji.json`
    );

    this.load.spritesheet(
      'player',
      `${assetsPath}/spritesheets/0x72-industrial-player-32px-extruded.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2,
      }
    );
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('kenney-tileset-64px-extruded');
    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const lavaLayer = map.createLayer('Lava', tileset, 0, 0);

    // Set colliding tiles before converting the layer to Matter bodies
    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(lavaLayer);

    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject(
      'Spawn',
      (obj) => obj.name === 'Spawn Point'
    );
    this.player = new Player(this, x, y);

    // Smoothly follow the player
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

    const help = this.add.text(16, 16, 'Arrows/WASD to move the player.', {
      fontSize: '18px',
      padding: { x: 10, y: 5 },
      backgroundColor: '#ffffff',
      fill: '#000000',
    });
    help.setScrollFactor(0).setDepth(1000);
  }
}

export default Main;
