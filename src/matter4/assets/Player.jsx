import { Input, Physics } from 'phaser';

import MultiKey from '../resources/MultiKey';
import {
  ASSET_PLAYER,
  ANIM_PLAYER_IDLE,
  ANIM_PLAYER_RUN,
} from '../resources/constants';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the animations we need from the player spritesheet
    scene.anims.create({
      key: ANIM_PLAYER_IDLE,
      frames: scene.anims.generateFrameNumbers(ASSET_PLAYER, {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });

    scene.anims.create({
      key: ANIM_PLAYER_RUN,
      frames: scene.anims.generateFrameNumbers(ASSET_PLAYER, {
        start: 8,
        end: 15,
      }),
      frameRate: 12,
      repeat: -1,
    });

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, ASSET_PLAYER, 0);

    this.sprite.setScale(2).setFixedRotation().setPosition(x, y);

    const { LEFT, RIGHT, A, D } = Input.Keyboard.KeyCodes;
    this.leftInput = new MultiKey(scene, [LEFT, A]);
    this.rightInput = new MultiKey(scene, [RIGHT, D]);

    this.scene.events.on('update', this.update, this);
  }

  update() {
    const moveForce = 0.02;

    if (this.leftInput.isDown()) {
      this.sprite.setFlipX(true);
      this.sprite.applyForce({ x: -moveForce, y: 0 });
    } else if (this.rightInput.isDown()) {
      this.sprite.setFlipX(false);
      this.sprite.applyForce({ x: moveForce, y: 0 });
    }

    if (this.sprite.body.velocity.x > 7) {
      this.sprite.setVelocityX(7);
    } else if (this.sprite.body.velocity.x < -7) {
      this.sprite.setVelocityX(-7);
    }
  }
}
