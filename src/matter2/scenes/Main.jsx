import { Cameras, Scene } from 'phaser';
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

    this.load.atlas(
      'emoji',
      `${assetsPath}/atlases/emoji.png`,
      `${assetsPath}/atlases/emoji.json`
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

    // Create two simple animations - one angry => grimace emoji and one heart eyes => grimace
    this.anims.create({
      key: 'angry',
      frames: [
        { key: 'emoji', frame: '1f92c' },
        { key: 'emoji', frame: '1f62c' },
      ],
      frameRate: 3,
      repeat: 0,
    });
    this.anims.create({
      key: 'love',
      frames: [
        { key: 'emoji', frame: '1f60d' },
        { key: 'emoji', frame: '1f62c' },
      ],
      frameRate: 3,
      repeat: 0,
    });

    const bodyOptions = {
      shape: 'circle',
      restitution: 1,
      friction: 0,
    };

    const emoji1 = this.matter.add.sprite(
      250,
      100,
      'emoji',
      '1f62c',
      bodyOptions
    );

    const emoji2 = this.matter.add.sprite(
      250,
      275,
      'emoji',
      '1f62c',
      bodyOptions
    );

    // Use the plugin to only listen for collisions between emoji 1 & 2
    this.matterCollision.addOnCollideStart({
      objectA: emoji1,
      objectB: emoji2,
      callback: ({ gameObjectA, gameObjectB }) => {
        gameObjectA.play('angry', false); // gameObjectA will always match the given "objectA"
        gameObjectB.play('love', false); // gameObjectB will always match the given "objectB"
      },
    });

    // Make the emoji draggable - not essential for the tutorial but fun to do. This works by
    // turning the emoji into a static body (not moved/rotated by forces in Matter) while dragging
    // and teleporting the object to the pointer position.
    emoji1.setInteractive();
    emoji2.setInteractive();

    this.input.setDraggable(emoji1);
    this.input.setDraggable(emoji2);

    this.input.on('drag', (pointer, gameObject, x, y) =>
      gameObject.setPosition(x, y)
    );
    this.input.on('dragstart', (pointer, gameObject) =>
      gameObject.setStatic(true)
    );
    this.input.on('dragend', (pointer, gameObject) =>
      gameObject.setStatic(false)
    );

    const help = this.add.text(
      16,
      16,
      'Click and drag the emoji.\nArrow keys to move the camera.',
      {
        fontSize: '18px',
        padding: { x: 10, y: 5 },
        backgroundColor: '#ffffff',
        fill: '#000000',
      }
    );
    help.setScrollFactor(0).setDepth(1000);

    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Cameras.Controls.FixedKeyControl({
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });
  }

  update(time, delta) {
    this.controls.update(delta);
  }
}

export default Main;
