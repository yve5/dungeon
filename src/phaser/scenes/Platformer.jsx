import { Math, Scene } from 'phaser';
import {
  FIRST_ASSET_BOMB,
  FIRST_ASSET_DUDE,
  FIRST_ASSET_GROUND,
  FIRST_ASSET_SKY,
  FIRST_ASSET_STAR,
  FIRST_KEY_LEFT,
  FIRST_KEY_RIGHT,
  FIRST_KEY_TURN,
} from '../resources/constants';

const { REACT_APP_FIRST_ASSETS_PATH: assetsPath } = process.env;

class First extends Scene {
  constructor() {
    super();

    this.scoreText = '';
    this.gameOver = false;
    this.score = 0;

    this.cursors = null;
    this.platforms = null;
    this.bombs = null;
    this.stars = null;
    this.player = null;
  }

  preload() {
    this.load.image(FIRST_ASSET_SKY, `${assetsPath}sky.png`);
    this.load.image(FIRST_ASSET_GROUND, `${assetsPath}platform.png`);
    this.load.image(FIRST_ASSET_STAR, `${assetsPath}star.png`);
    this.load.image(FIRST_ASSET_BOMB, `${assetsPath}bomb.png`);
    this.load.spritesheet(FIRST_ASSET_DUDE, `${assetsPath}dude.png`, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, FIRST_ASSET_SKY);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms
      .create(400, 568, FIRST_ASSET_GROUND)
      .setScale(2)
      .refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, FIRST_ASSET_GROUND);
    this.platforms.create(50, 250, FIRST_ASSET_GROUND);
    this.platforms.create(750, 220, FIRST_ASSET_GROUND);

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, FIRST_ASSET_DUDE);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: FIRST_KEY_LEFT,
      frames: this.anims.generateFrameNumbers(FIRST_ASSET_DUDE, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: FIRST_KEY_TURN,
      frames: [{ key: FIRST_ASSET_DUDE, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: FIRST_KEY_RIGHT,
      frames: this.anims.generateFrameNumbers(FIRST_ASSET_DUDE, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: FIRST_ASSET_STAR,
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70,
      },
    });

    this.stars.children.iterate((child) => {
      //  Give each star a slightly different bounce
      child.setBounceY(Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars,
    // if he does call the collectStar function
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (!this.gameOver) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play(FIRST_KEY_LEFT, true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play(FIRST_KEY_RIGHT, true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play(FIRST_KEY_TURN);
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = player.x < 400 ? Math.Between(400, 800) : Math.Between(0, 400);
      const bomb = this.bombs.create(x, 16, FIRST_ASSET_BOMB);

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player) {
    this.physics.pause();

    player.setTint(0xff0000);
    player.anims.play(FIRST_KEY_TURN);

    this.gameOver = true;
  }
}

export default First;
