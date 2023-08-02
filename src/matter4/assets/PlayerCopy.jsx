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

    // The player's body is going to be a compound body that looks something like this:
    //
    //                  A = main body
    //
    //                   +---------+
    //                   |         |
    //                 +-+         +-+
    //       B = left  | |         | |  C = right
    //    wall sensor  |B|    A    |C|  wall sensor
    //                 | |         | |
    //                 +-+         +-+
    //                   |         |
    //                   +-+-----+-+
    //                     |  D  |
    //                     +-----+
    //
    //                D = ground sensor
    //
    // The main body is what collides with the world. The sensors are used to determine if the
    // player is blocked by a wall or standing on the ground.

    const { Body, Bodies } = Physics.Matter.Matter;
    const { width: www, height: hhh } = this.sprite;

    const mainBody = Bodies.rectangle(0, 0, www * 0.6, hhh, {
      chamfer: { radius: 10 },
    });

    this.sensors = {
      bottom: Bodies.rectangle(0, hhh * 0.5, www * 0.25, 2, {
        isSensor: true,
        label: 'playerBottom',
      }),
      left: Bodies.rectangle(-www * 0.35, 0, 2, hhh * 0.5, {
        isSensor: true,
        label: 'playerLeft',
      }),
      right: Bodies.rectangle(www * 0.35, 0, 2, hhh * 0.5, {
        isSensor: true,
        label: 'playerRight',
      }),
    };

    const compoundBody = Body.create({
      parts: [
        mainBody,
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
      ],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1,
      // The offset here allows us to control where the sprite is placed relative to the
      // matter body's x and y - here we want the sprite centered over the matter body.
      render: {
        sprite: { xOffset: 0.5, yOffset: 0.5 },
      },
    });

    this.sprite
      .setExistingBody(compoundBody)
      .setScale(2)
      .setFixedRotation() // Sets inertia to infinity so the player can't rotate
      .setPosition(x, y);

    // Track which sensors are touching something
    this.isTouching = {
      left: false,
      right: false,
      ground: false,
    };

    // Jumping is going to have a cooldown
    this.canJump = true;
    this.jumpCooldownTimer = null;

    // // Before matter's update, reset our record of which surfaces the player is touching.
    // scene.matter.world.on('beforeupdate', this.resetTouching, this);

    // scene.matterCollision.addOnCollideStart({
    //   objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
    //   callback: this.onSensorCollide,
    //   context: this,
    // });

    // scene.matterCollision.addOnCollideActive({
    //   objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
    //   callback: this.onSensorCollide,
    //   context: this,
    // });

    scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      // const target = pairs.find(({ bodyB }) => bodyB.label === 'playerBottom');

      if (bodyB.isSensor) {
        // console.log(bodyB.label);

        if (bodyB.label === 'playerBottom') {
          this.isTouching.ground = true;
        }
      }
    });

    scene.matter.world.on('collisionend', (event, bodyA, bodyB) => {
      // const target = pairs.find(({ bodyB }) => bodyB.label === 'playerBottom');

      if (bodyB.isSensor) {
        if (bodyB.label === 'playerBottom') {
          console.log('collisionsend', bodyB.label);
          this.isTouching.ground = false;
        }
      }
    });

    // Track the keys
    const { LEFT, RIGHT, UP, A, D, W } = Input.Keyboard.KeyCodes;
    this.leftInput = new MultiKey(scene, [LEFT, A]);
    this.rightInput = new MultiKey(scene, [RIGHT, D]);
    this.jumpInput = new MultiKey(scene, [UP, W]);

    this.destroyed = false;
    this.scene.events.on('update', this.update, this);
    this.scene.events.once('shutdown', this.destroy, this);
    this.scene.events.once('destroy', this.destroy, this);
  }

  onSensorCollide({ bodyA, bodyB, pair }) {
    // Watch for the player colliding with walls/objects on either side and the ground below, so
    // that we can use that logic inside of update to move the player.
    // Note: we are using the "pair.separation" here. That number tells us how much bodyA and bodyB
    // overlap. We want to teleport the sprite away from walls just enough so that the player won't
    // be able to press up against the wall and use friction to hang in midair. This formula leaves
    // 0.5px of overlap with the sensor so that the sensor will stay colliding on the next tick if
    // the player doesn't move.

    if (bodyB.isSensor) {
      return; // We only care about collisions with physical objects
    }

    if (bodyA === this.sensors.left) {
      this.isTouching.left = true;

      if (pair.separation > 0.5) {
        this.sprite.x += pair.separation - 0.5;
      }
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = true;

      if (pair.separation > 0.5) {
        this.sprite.x -= pair.separation - 0.5;
      }
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    }
  }

  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
  }

  freeze() {
    this.sprite.setStatic(true);
  }

  update() {
    if (this.destroyed) {
      return;
    }

    const isRightKeyDown = this.rightInput.isDown();
    const isLeftKeyDown = this.leftInput.isDown();
    const isJumpKeyDown = this.jumpInput.isDown();
    const isOnGround = this.isTouching.ground;
    const isInAir = !isOnGround;

    // Adjust the movement so that the player is slower in the air
    const moveForce = isOnGround ? 0.01 : 0.005;

    if (isLeftKeyDown) {
      this.sprite.setFlipX(true);

      // Don't let the player push things left if they in the air
      if (!(isInAir && this.isTouching.left)) {
        this.sprite.applyForce({ x: -moveForce, y: 0 });
      }
    } else if (isRightKeyDown) {
      this.sprite.setFlipX(false);

      // Don't let the player push things right if they in the air
      if (!(isInAir && this.isTouching.right)) {
        this.sprite.applyForce({ x: moveForce, y: 0 });
      }
    }

    // Limit horizontal speed, without this the player's velocity would just keep increasing to
    // absurd speeds. We don't want to touch the vertical velocity though, so that we don't
    // interfere with gravity.
    if (this.sprite.body.velocity.x > 7) {
      this.sprite.setVelocityX(7);
    } else if (this.sprite.body.velocity.x < -7) {
      this.sprite.setVelocityX(-7);
    }

    // --- Move the player vertically ---
    if (isJumpKeyDown && this.canJump && isOnGround) {
      this.sprite.setVelocityY(-11);

      // Add a slight delay between jumps since the bottom sensor will still collide for a few
      // frames after a jump is initiated
      this.canJump = false;
      this.jumpCooldownTimer = this.scene.time.addEvent({
        delay: 250,
        callback: () => {
          this.canJump = true;
        },
      });
    }

    // Update the animation/texture based on the state of the player's state
    if (isOnGround) {
      if (this.sprite.body.force.x !== 0) {
        this.sprite.anims.play(ANIM_PLAYER_RUN, true);
      } else {
        this.sprite.anims.play(ANIM_PLAYER_IDLE, true);
      }
    } else {
      this.sprite.anims.stop();
      this.sprite.setTexture(ASSET_PLAYER, 10);
    }
  }

  destroy() {
    // Clean up any listeners that might trigger events after the player is officially destroyed
    this.scene.events.off('update', this.update, this);
    this.scene.events.off('shutdown', this.destroy, this);
    this.scene.events.off('destroy', this.destroy, this);

    if (this.scene.matter.world) {
      this.scene.matter.world.off('beforeupdate', this.resetTouching, this);
    }

    // const sensors = [
    //   this.sensors.bottom,
    //   this.sensors.left,
    //   this.sensors.right,
    // ];

    // this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
    // this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });

    if (this.jumpCooldownTimer) {
      this.jumpCooldownTimer.destroy();
    }

    this.destroyed = true;
    this.sprite.destroy();
  }
}
