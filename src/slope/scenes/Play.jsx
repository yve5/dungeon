import { Geom, Input, Scene } from 'phaser';
import {
  SCENE_PLAY,
  ASSET_PLAYER,
  ASSET_FLOOR,
  ASSET_BIG,
  ASSET_SLOPE,
  KEY_IDLE,
  KEY_JUMP,
  KEY_RUN,
  CONFIG_GRAVITY_Y,
  CONFIG_PLAYER_VEL_X,
  CONFIG_PLAYER_VEL_Y,
} from '../resources/constants';

class Play extends Scene {
  constructor() {
    super({ key: SCENE_PLAY });
  }

  create() {
    this.createGround();
    this.createPlayer();
    this.physics.add.collider([this.floor, this.big], this.player);

    this.createText();
  }

  createText() {
    this.text = this.add.text(
      16,
      16,
      'Left and Right arrows to move, Up arrow to jump',
      { fontSize: 8, color: '#ffffff' }
    );
  }

  createGround() {
    this.floor = this.physics.add.sprite(
      0,
      this.game.config.height - 32,
      ASSET_FLOOR
    );
    this.floor.setImmovable(true);
    this.floor.setOrigin(0);
    this.floor.body.setAllowGravity(false);

    this.big = this.physics.add.sprite(
      this.floor.width,
      this.game.config.height - 132,
      ASSET_BIG
    );
    this.big.x = this.floor.width - this.big.width;
    this.big.setImmovable(true);
    this.big.setOrigin(0);
    this.big.body.setAllowGravity(false);

    this.slope = this.physics.add.sprite(
      this.big.x - this.big.width,
      this.game.config.height - 132,
      ASSET_SLOPE
    );
    this.slope.setImmovable(true);
    this.slope.setOrigin(0);

    this.triangle = new Geom.Triangle(
      this.slope.x,
      this.slope.y + this.slope.height,
      this.slope.x + this.slope.width,
      this.slope.y,
      this.slope.x + this.slope.width,
      this.slope.y + this.slope.height
    );

    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00aa00 },
    });
  }

  createPlayer() {
    this.anims.create({
      key: KEY_RUN,
      frames: this.anims.generateFrameNumbers(ASSET_PLAYER, {
        start: 0,
        end: 3,
        first: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: KEY_IDLE,
      frames: this.anims.generateFrameNumbers(ASSET_PLAYER, {
        start: 0,
        end: 0,
      }),
    });

    this.anims.create({
      key: KEY_JUMP,
      frames: this.anims.generateFrameNumbers(ASSET_PLAYER, {
        start: 3,
        end: 3,
      }),
    });

    this.player = this.physics.add.sprite(
      this.game.config.width / 2 - 24,
      this.game.config.height - 48,
      ASSET_PLAYER
    );
    this.player.name = ASSET_PLAYER;
    this.player.anims.play(KEY_IDLE);
    this.player.body.gravity.y = CONFIG_GRAVITY_Y;
    this.player.setCollideWorldBounds(true);
    this.player.setInteractive({ draggable: true });

    this.input.on('dragstart', (pointer, player) => {
      player.setTint(0xff0000);
    });

    this.input.on('drag', (pointer, player, dragX, dragY) => {
      player.setPosition(dragX, dragY);
    });

    this.input.on('dragend', (pointer, player) => {
      player.clearTint();
    });

    const { RIGHT, LEFT, UP } = Input.Keyboard.KeyCodes;

    this.keys = this.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
    });
  }

  update() {
    const { right, left, up } = this.keys;

    const isGround =
      this.player.body.touching.down || this.player.body.blocked.down;

    this.graphics.clear();
    this.graphics.lineStyle(2, 0xff0000);

    if ((right.isDown || left.isDown) && (isGround || this.player.isOnSlope)) {
      this.player.anims.play(KEY_RUN, true);
    } else if (!isGround && !this.player.isOnSlope) {
      this.player.anims.play(KEY_JUMP, true);
    } else {
      this.player.anims.play(KEY_IDLE, true);
    }

    if (right.isDown) {
      this.player.body.setVelocityX(CONFIG_PLAYER_VEL_X);
      this.player.setFlipX(false);
    } else if (left.isDown) {
      this.player.body.setVelocityX(-CONFIG_PLAYER_VEL_X);
      this.player.setFlipX(true);
    } else if (!isGround && !this.player.isOnSlope) {
      this.player.body.setVelocityX(this.player.body.velocity.x * 0.98);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (isGround && up.isDown) {
      this.player.body.setVelocityY(CONFIG_PLAYER_VEL_Y);
    }

    if (
      this.physics.world.intersects(this.player.body, this.slope.body) &&
      Geom.Intersects.RectangleToTriangle(
        this.player.getBounds(),
        this.triangle
      )
    ) {
      if (up.isDown) {
        this.player.body.setAllowGravity(true);
        this.player.body.gravity.y = CONFIG_GRAVITY_Y;
        this.player.body.setVelocityY(CONFIG_PLAYER_VEL_Y);
      } else {
        this.player.body.position.y =
          this.slope.y +
          this.slope.height -
          this.player.height -
          (this.player.body.position.x + this.player.width - this.slope.x);

        this.player.body.setAllowGravity(false);
      }
    } else {
      this.player.body.setAllowGravity(true);
    }

    if (
      Geom.Intersects.RectangleToTriangle(
        this.player.getBounds(),
        this.triangle
      )
    ) {
      this.player.isOnSlope = true;
      this.graphics.lineStyle(2, 0xff0000);
    } else {
      this.player.isOnSlope = false;
      this.graphics.lineStyle(2, 0xffff00);
    }
  }
}

export default Play;
