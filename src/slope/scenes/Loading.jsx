import Phaser from 'phaser';

class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadScene' });
  }

  preload() {
    this.load.spritesheet('player', './platformer/assets/slope/hero.png', {
      frameWidth: 20,
      frameHeight: 32,
    });
    this.load.image('floor', './platformer/assets/slope/floor.png');
    this.load.image('big', './platformer/assets/slope/big.png');
    this.load.image('slope', './platformer/assets/slope/slope.png');
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default LoadScene;
