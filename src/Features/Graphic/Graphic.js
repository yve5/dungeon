import React, { Component } from 'react';
import './Graphic.scss';

import { map } from '../../data/maps/2';

class Graphic extends Component {

  constructor(props) {
    super(props);
    // this.state = { rotation: 0 };
    this.height = 500;
    this.width = 500;


    this.alert_errors = false;
    this.log_info = true;
    this.tile_size = 16;
    this.limitViewport = false;
    this.jump_switch = 0;

    this.viewport = {
      x: 200,
      y: 200
    };

    this.camera = {
      x: 0,
      y: 0
    };

    this.key = {
      left: false,
      right: false,
      up: false
    };

    this.player = {
      loc: {
        x: 0,
        y: 0
      },
      vel: {
        x: 0,
        y: 0
      },
      can_jump: true
    };


    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);


    this.setViewport(this.width, this.height);
    this.loadMap(map);
    // this.limitViewport = true;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.requestAnimationFrame(this.loop);
  }
  
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown() {
    console.log('hello', 'down');
  }

  handleKeyUp() {
    console.log('hello', 'up');
  }

  loop() {
    this.paint();

    window.requestAnimationFrame(this.loop);
  }

  paint() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, this.width, this.height);

    // game.update();
    // game.draw(ctx);
  }

  update() {
    this.updatePlayer();
  }

  updatePlayer() {
    if (this.key.left) {
      if (this.player.vel.x > -this.currentMap.velLimit.x) {
        this.player.vel.x -= this.currentMap.movementSpeed.left;
      }
    }

    // if (this.key.up) {

    //   if (this.player.can_jump && this.player.vel.y > -this.current_map.vel_limit.y) {

    //     this.player.vel.y -= this.current_map.movement_speed.jump;
    //     this.player.can_jump = false;
    //   }
    // }

    // if (this.key.right) {

    //   if (this.player.vel.x < this.current_map.vel_limit.x)
    //     this.player.vel.x += this.current_map.movement_speed.left;
    // }

    // this.move_player();
  }

  setViewport(x, y) {
    this.viewport.x = x;
    this.viewport.y = y;
  }

  loadMap(map) {
    if (typeof map === 'undefined' || typeof map.data === 'undefined' || typeof map.keys === 'undefined') {
      console.error('Error: Invalid map data!');
      // this.error('Error: Invalid map data!');
      return false;
    }

    this.currentMap = map;

    this.currentMap.background = map.background || '#333';
    this.currentMap.gravity = map.gravity || { x: 0, y: 0.3 };
    this.tileSize = map.tileSize || 16;

    this.currentMap.width = 0;
    this.currentMap.height = 0;

    let self = this;

    map.keys.forEach(function (key) {
      map.data.forEach(function (row, y) {
        self.currentMap.height = Math.max(self.currentMap.height, y);

        row.forEach(function (tile, x) {
          self.currentMap.width = Math.max(self.currentMap.width, x);

          if (tile === key.id) {
            self.currentMap.data[y][x] = key;
          }
        });
      });
    });

    this.currentMap.widthP = this.currentMap.width * this.tileSize;
    this.currentMap.heightP = this.currentMap.height * this.tileSize;

    this.player.loc.x = map.player.x * this.tileSize || 0;
    this.player.loc.y = map.player.y * this.tileSize || 0;
    this.player.colour = map.player.colour || '#000';

    this.camera = {
      x: 0,
      y: 0
    };

    this.player.vel = {
      x: 0,
      y: 0
    };

    // this.log('Successfully loaded map data.');

    return true;
  }

  render() {
    return (
      <canvas ref="canvas" width={this.width} height={this.height} />
    );
  }
}

export default Graphic;