import { Math, Scene } from 'phaser';

import Platform from '../assets/Platform';
import Player from '../assets/Player';
import {
  SCENE_MAIN,
  ASSET_BLOCK,
  ASSET_EMOJI,
  ASSET_KENNEY,
  ASSET_PLANK,
  ASSET_PLAYER,
  ASSET_MAP,
  TILE_GROUND,
  TILE_SPAWN,
  TILE_LAVA,
  TILE_BACKGROUND,
  TILE_FOREGROUND,
  TILE_LOCATIONS,
  TILE_CELEBRATION,
  TILE_CRATES,
} from '../resources/constants';

const { REACT_APP_MATTER_ASSETS_PATH: assetsPath } = process.env;

class Main extends Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  preload() {
    this.load.tilemapTiledJSON(ASSET_MAP, `${assetsPath}/tilemaps/level.json`);
    this.load.image(
      ASSET_KENNEY,
      `${assetsPath}/tilesets/kenney-tileset-64px-extruded.png`
    );

    this.load.image(ASSET_BLOCK, `${assetsPath}/images/block.png`);
    this.load.image(ASSET_PLANK, `${assetsPath}/images/wooden-plank.png`);

    this.load.atlas(
      ASSET_EMOJI,
      `${assetsPath}/atlases/emoji.png`,
      `${assetsPath}/atlases/emoji.json`
    );

    this.load.spritesheet(
      ASSET_PLAYER,
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
    const inMap = this.make.tilemap({ key: ASSET_MAP });
    const inTileset = inMap.addTilesetImage(ASSET_KENNEY);

    const groundLayer = inMap.createLayer(TILE_GROUND, inTileset, 0, 0);
    const lavaLayer = inMap.createLayer(TILE_LAVA, inTileset, 0, 0);
    inMap.createLayer(TILE_BACKGROUND, inTileset, 0, 0);
    inMap.createLayer(TILE_FOREGROUND, inTileset, 0, 0).setDepth(10);

    // Set colliding tiles before converting the layer to Matter bodies
    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    const inWorld = this.matter.world;
    const inCamera = this.cameras.main;

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    inWorld.convertTilemapLayer(groundLayer);
    inWorld.convertTilemapLayer(lavaLayer);

    const wip = inMap.widthInPixels;
    const hip = inMap.heightInPixels;

    inWorld.setBounds(0, 0, wip, hip);
    inCamera.setBounds(0, 0, wip, hip);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = inMap.findObject(
      'Spawn',
      ({ name }) => name === TILE_SPAWN
    );
    this.player = new Player(this, x, y);

    // Smoothly follow the player
    inCamera.startFollow(this.player.sprite, false, 0.5, 0.5);

    // inWorld.on('collisionactive', ({ pairs }) => {
    //   if (
    //     pairs?.find(
    //       ({ gameObjectA, gameObjectB }) =>
    //         gameObjectA?.properties?.isLethal &&
    //         gameObjectB?.texture?.key === ASSET_PLAYER
    //     )
    //   ) {
    //     this.player.freeze();
    //     inCamera.fade(250, 0, 0, 0);
    //     inCamera.once('camerafadeoutcomplete', () => this.scene.restart());
    //   }
    // });

    // Load up some crates from the "Crates" object layer created in Tiled
    inMap
      .getObjectLayer(TILE_CRATES)
      .objects.forEach(({ x: inX, y: inY, width, height }) => {
        this.matter.add
          .image(inX + width / 2, inY - height / 2, ASSET_BLOCK)
          .setBody({ shape: 'rectangle', density: 0.001 });
      });

    // Create platforms at the point locations in the "Platform Locations" layer created in Tiled
    inMap
      .getObjectLayer(TILE_LOCATIONS)
      .objects.forEach((point) => Platform(this, point.x, point.y));

    // Create a sensor at rectangle object created in Tiled (under the "Sensors" layer)
    const rect = inMap.findObject(
      'Sensors',
      ({ name }) => name === TILE_CELEBRATION
    );

    this.matter.add.rectangle(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2,
      rect.width,
      rect.height,
      {
        isSensor: true, // It shouldn't physically interact with other bodies
        isStatic: true, // It shouldn't move
        label: 'Celebration',
      }
    );

    let emojiFlag = false;

    inWorld.on('collisionactive', ({ pairs }) => {
      if (
        !emojiFlag &&
        pairs.find(
          ({ gameObjectA, bodyB }) =>
            bodyB?.label === 'Celebration' &&
            gameObjectA?.texture?.key === ASSET_PLAYER
        )
      ) {
        emojiFlag = true;

        // Drop some heart-eye emojis, of course
        for (let i = 0; i < 35; i += 1) {
          const xxx = this.player.sprite.x + Math.RND.integerInRange(-50, 50);
          const yyy =
            this.player.sprite.y - 150 + Math.RND.integerInRange(-10, 10);

          this.matter.add
            .image(xxx, yyy, ASSET_EMOJI, '1f60d', {
              restitution: 1,
              friction: 0,
              density: 0.0001,
              shape: 'circle',
            })
            .setScale(0.5);
        }
      }
    });

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
