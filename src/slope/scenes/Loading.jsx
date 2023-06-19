import { Scene } from 'phaser';
import {
  SCENE_LOAD,
  SCENE_PLAY,
  ASSET_PLAYER,
  ASSET_FLOOR,
  ASSET_BIG,
  ASSET_SLOPE,
} from '../resources/constants';

const { REACT_APP_SLOPE_ASSETS_PATH: assetsPath } = process.env;

class Loading extends Scene {
  constructor() {
    super({ key: SCENE_LOAD });
  }

  preload() {
    this.load.spritesheet(ASSET_PLAYER, `${assetsPath}hero.png`, {
      frameWidth: 20,
      frameHeight: 32,
    });
    this.load.image(ASSET_FLOOR, `${assetsPath}floor.png`);
    this.load.image(ASSET_BIG, `${assetsPath}big.png`);
    this.load.image(ASSET_SLOPE, `${assetsPath}slope.png`);
  }

  create() {
    this.scene.start(SCENE_PLAY);
  }
}

export default Loading;
