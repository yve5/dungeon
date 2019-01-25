import React, { Component } from 'react';
import './Graphic.scss';

import { map } from '../../data/maps/2';

class Graphic extends Component {

  constructor(props) {
    super(props);

    this.height = 500;
    this.width = 500;

    this.alertErrors = false;
    this.logSnfo = true;
    this.tileSize = 16;
    this.limitViewport = false;
    this.jumpsSwitch = 0;

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
      canJump: true
    };


    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.paint = this.paint.bind(this);
    this.update = this.update.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.setViewport = this.setViewport.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.movePlayer = this.movePlayer.bind(this);


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

  handleKeyDown(eve) {
    switch (eve.keyCode) {
      case 37:
        this.key.left = true;
        break;
      case 38:
        this.key.up = true;
        break;
      case 39:
        this.key.right = true;
        break;
      default:
        break;
    }
  }

  handleKeyUp(eve) {
    switch (eve.keyCode) {
      case 37:
        this.key.left = false;
        break;
      case 38:
        this.key.up = false;
        break;
      case 39:
        this.key.right = false;
        break;
      default:
        break;
    }
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

    this.update();
    // game.draw(ctx);
  }

  update() {
    this.updatePlayer();
  }

  updatePlayer() {
    if (this.key.left) {
      console.info('left');
      // if (this.player.vel.x > -this.currentMap.velLimit.x) {
      //   this.player.vel.x -= this.currentMap.movementSpeed.left;
      // }
    }

    if (this.key.up) {
      console.info('up');
      // if (this.player.canJump && this.player.vel.y > -this.currentMap.velLimit.y) {
      //   this.player.vel.y -= this.currentMap.movementSpeed.jump;
      //   this.player.canJump = false;
      // }
    }

    if (this.key.right) {
      console.info('right');
      // if (this.player.vel.x < this.currentMap.velLimit.x) {
      //   this.player.vel.x += this.currentMap.movementSpeed.left;
      // }
    }

    this.movePlayer();
  }

  movePlayer() {

    let tX = this.player.loc.x + this.player.vel.x;
    let tY = this.player.loc.y + this.player.vel.y;

    let offset = Math.round((this.tileSize / 2) - 1);

    // var tile = this.get_tile(
    //   Math.round(this.player.loc.x / this.tile_size),
    //   Math.round(this.player.loc.y / this.tile_size)
    // );

    // if (tile.gravity) {

    //   this.player.vel.x += tile.gravity.x;
    //   this.player.vel.y += tile.gravity.y;

    // } else {

    //   this.player.vel.x += this.current_map.gravity.x;
    //   this.player.vel.y += this.current_map.gravity.y;
    // }

    // if (tile.friction) {

    //   this.player.vel.x *= tile.friction.x;
    //   this.player.vel.y *= tile.friction.y;
    // }

    // var t_y_up = Math.floor(tY / this.tile_size);
    // var t_y_down = Math.ceil(tY / this.tile_size);
    // var y_near1 = Math.round((this.player.loc.y - offset) / this.tile_size);
    // var y_near2 = Math.round((this.player.loc.y + offset) / this.tile_size);

    // var t_x_left = Math.floor(tX / this.tile_size);
    // var t_x_right = Math.ceil(tX / this.tile_size);
    // var x_near1 = Math.round((this.player.loc.x - offset) / this.tile_size);
    // var x_near2 = Math.round((this.player.loc.x + offset) / this.tile_size);

    // var top1 = this.get_tile(x_near1, t_y_up);
    // var top2 = this.get_tile(x_near2, t_y_up);
    // var bottom1 = this.get_tile(x_near1, t_y_down);
    // var bottom2 = this.get_tile(x_near2, t_y_down);
    // var left1 = this.get_tile(t_x_left, y_near1);
    // var left2 = this.get_tile(t_x_left, y_near2);
    // var right1 = this.get_tile(t_x_right, y_near1);
    // var right2 = this.get_tile(t_x_right, y_near2);


    // if (tile.jump && this.jump_switch > 15) {

    //   this.player.can_jump = true;

    //   this.jump_switch = 0;

    // } else this.jump_switch++;

    // this.player.vel.x = Math.min(Math.max(this.player.vel.x, -this.current_map.vel_limit.x), this.current_map.vel_limit.x);
    // this.player.vel.y = Math.min(Math.max(this.player.vel.y, -this.current_map.vel_limit.y), this.current_map.vel_limit.y);

    // this.player.loc.x += this.player.vel.x;
    // this.player.loc.y += this.player.vel.y;

    // this.player.vel.x *= .9;

    // if (left1.solid || left2.solid || right1.solid || right2.solid) {

    //   /* fix overlap */

    //   while (this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near1).solid
    //     || this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near2).solid)
    //     this.player.loc.x += 0.1;

    //   while (this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near1).solid
    //     || this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near2).solid)
    //     this.player.loc.x -= 0.1;

    //   /* tile bounce */

    //   var bounce = 0;

    //   if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
    //   if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
    //   if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
    //   if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

    //   this.player.vel.x *= -bounce || 0;

    // }

    // if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {

    //   /* fix overlap */

    //   while (this.get_tile(x_near1, Math.floor(this.player.loc.y / this.tile_size)).solid
    //     || this.get_tile(x_near2, Math.floor(this.player.loc.y / this.tile_size)).solid)
    //     this.player.loc.y += 0.1;

    //   while (this.get_tile(x_near1, Math.ceil(this.player.loc.y / this.tile_size)).solid
    //     || this.get_tile(x_near2, Math.ceil(this.player.loc.y / this.tile_size)).solid)
    //     this.player.loc.y -= 0.1;

    //   /* tile bounce */

    //   var bounce = 0;

    //   if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
    //   if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
    //   if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
    //   if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;

    //   this.player.vel.y *= -bounce || 0;

    //   if ((bottom1.solid || bottom2.solid) && !tile.jump) {

    //     this.player.on_floor = true;
    //     this.player.can_jump = true;
    //   }

    // }

    // // adjust camera

    // var c_x = Math.round(this.player.loc.x - this.viewport.x / 2);
    // var c_y = Math.round(this.player.loc.y - this.viewport.y / 2);
    // var x_dif = Math.abs(c_x - this.camera.x);
    // var y_dif = Math.abs(c_y - this.camera.y);

    // if (x_dif > 5) {

    //   var mag = Math.round(Math.max(1, x_dif * 0.1));

    //   if (c_x != this.camera.x) {

    //     this.camera.x += c_x > this.camera.x ? mag : -mag;

    //     if (this.limit_viewport) {

    //       this.camera.x =
    //         Math.min(
    //           this.current_map.width_p - this.viewport.x + this.tile_size,
    //           this.camera.x
    //         );

    //       this.camera.x =
    //         Math.max(
    //           0,
    //           this.camera.x
    //         );
    //     }
    //   }
    // }

    // if (y_dif > 5) {

    //   var mag = Math.round(Math.max(1, y_dif * 0.1));

    //   if (c_y != this.camera.y) {

    //     this.camera.y += c_y > this.camera.y ? mag : -mag;

    //     if (this.limit_viewport) {

    //       this.camera.y =
    //         Math.min(
    //           this.current_map.height_p - this.viewport.y + this.tile_size,
    //           this.camera.y
    //         );

    //       this.camera.y =
    //         Math.max(
    //           0,
    //           this.camera.y
    //         );
    //     }
    //   }
    // }

    // if (this.last_tile != tile.id && tile.script) {

    //   eval(this.current_map.scripts[tile.script]);
    // }

    // this.last_tile = tile.id;
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

    return true;
  }

  render() {
    return (
      <canvas ref="canvas" width={this.width} height={this.height} />
    );
  }
}

export default Graphic;