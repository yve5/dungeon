import React, { Component } from 'react';
import { firstLevel } from '../../data/maps/2';


class Graphic extends Component {

  constructor(props) {
    super(props);

    this.canvasHeight = 500;
    this.canvasWidth = 500;

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

    this.state = {
      player: {
        loc: {
          x: 0,
          y: 0,
        },
        vel: {
          x: 0,
          y: 0,
        },
        canJump: true
      },
      notification: '',
    }


    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.paint = this.paint.bind(this);
    this.update = this.update.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.setViewport = this.setViewport.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.getTile = this.getTile.bind(this);
    this.drawTile = this.drawTile.bind(this);
    this.drawMap = this.drawMap.bind(this);
    this.drawPlayer = this.drawPlayer.bind(this);
    this.draw = this.draw.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMove = this.handleMove.bind(this);


    this.setViewport(this.canvasWidth, this.canvasHeight);
    this.loadMap(firstLevel);
    this.limitViewport = true;
    this.touchIsSupported = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    if (this.touchIsSupported) {
      document.addEventListener('touchstart', this.handleStart);
      document.addEventListener('touchend', this.handleEnd);
      document.addEventListener('touchcancel', this.handleCancel);
      document.addEventListener('touchmove', this.handleMove);
    }

    window.requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);

    if (this.touchIsSupported) {
      document.addEventListener('touchstart', this.handleStart);
      document.addEventListener('touchend', this.handleEnd);
      document.addEventListener('touchcancel', this.handleCancel);
      document.addEventListener('touchmove', this.handleMove);
    }
  }

  handleStart(eve) {
    console.log('handleStart', eve);
  }

  handleEnd(eve) {
    console.log('handleEnd', eve);
  }

  handleCancel(eve) {
    console.log('handleCancel', eve);
  }

  handleMove(eve) {
    console.log('handleMove', eve);
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
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.update();
    this.draw(ctx)
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

    if (this.key.up) {
      if (this.player.canJump && this.player.vel.y > -this.currentMap.velLimit.y) {
        this.player.vel.y -= this.currentMap.movementSpeed.jump;
        this.player.canJump = false;
      }
    }

    if (this.key.right) {
      if (this.player.vel.x < this.currentMap.velLimit.x) {
        this.player.vel.x += this.currentMap.movementSpeed.left;
      }
    }

    this.movePlayer();
  }

  getTile(x, y) {
    return (this.currentMap.data[y] && this.currentMap.data[y][x]) ? this.currentMap.data[y][x] : 0;
  };

  movePlayer() {
    let tX = this.player.loc.x + this.player.vel.x;
    let tY = this.player.loc.y + this.player.vel.y;

    let offset = Math.round((this.tileSize / 2) - 1);

    let tile = this.getTile(
      Math.round(this.player.loc.x / this.tileSize),
      Math.round(this.player.loc.y / this.tileSize)
    );

    if (tile.gravity) {
      this.player.vel.x += tile.gravity.x;
      this.player.vel.y += tile.gravity.y;
    }
    else {
      this.player.vel.x += this.currentMap.gravity.x;
      this.player.vel.y += this.currentMap.gravity.y;
    }

    if (tile.friction) {
      this.player.vel.x *= tile.friction.x;
      this.player.vel.y *= tile.friction.y;
    }


    let t_y_up = Math.floor(tY / this.tileSize);
    let t_y_down = Math.ceil(tY / this.tileSize);
    let y_near1 = Math.round((this.player.loc.y - offset) / this.tileSize);
    let y_near2 = Math.round((this.player.loc.y + offset) / this.tileSize);

    let t_x_left = Math.floor(tX / this.tileSize);
    let t_x_right = Math.ceil(tX / this.tileSize);
    let x_near1 = Math.round((this.player.loc.x - offset) / this.tileSize);
    let x_near2 = Math.round((this.player.loc.x + offset) / this.tileSize);

    let top1 = this.getTile(x_near1, t_y_up);
    let top2 = this.getTile(x_near2, t_y_up);
    let bottom1 = this.getTile(x_near1, t_y_down);
    let bottom2 = this.getTile(x_near2, t_y_down);
    let left1 = this.getTile(t_x_left, y_near1);
    let left2 = this.getTile(t_x_left, y_near2);
    let right1 = this.getTile(t_x_right, y_near1);
    let right2 = this.getTile(t_x_right, y_near2);


    if (tile.jump && this.jump_switch > 15) {
      this.player.canJump = true;
      this.jumpsSwitch = 0;
    }
    else {
      this.jumpsSwitch++;
    }

    this.player.vel.x = Math.min(Math.max(this.player.vel.x, -this.currentMap.velLimit.x), this.currentMap.velLimit.x);
    this.player.vel.y = Math.min(Math.max(this.player.vel.y, -this.currentMap.velLimit.y), this.currentMap.velLimit.y);

    this.player.loc.x += this.player.vel.x;
    this.player.loc.y += this.player.vel.y;

    this.player.vel.x *= .9;


    if (left1.solid || left2.solid || right1.solid || right2.solid) {
      // fix overlap
      while (this.getTile(Math.floor(this.player.loc.x / this.tileSize), y_near1).solid || this.getTile(Math.floor(this.player.loc.x / this.tileSize), y_near2).solid) {
        this.player.loc.x += 0.1;
      }

      while (this.getTile(Math.ceil(this.player.loc.x / this.tileSize), y_near1).solid || this.getTile(Math.ceil(this.player.loc.x / this.tileSize), y_near2).solid) {
        this.player.loc.x -= 0.1;
      }

      // tile bounce
      let bounce = 0;

      if (left1.solid && left1.bounce > bounce) {
        bounce = left1.bounce;
      }
      if (left2.solid && left2.bounce > bounce) {
        bounce = left2.bounce;
      }
      if (right1.solid && right1.bounce > bounce) {
        bounce = right1.bounce;
      }
      if (right2.solid && right2.bounce > bounce) {
        bounce = right2.bounce;
      }

      this.player.vel.x *= -bounce || 0;
    }


    if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {
      // fix overlap
      while (this.getTile(x_near1, Math.floor(this.player.loc.y / this.tileSize)).solid || this.getTile(x_near2, Math.floor(this.player.loc.y / this.tileSize)).solid) {
        this.player.loc.y += 0.1;
      }

      while (this.getTile(x_near1, Math.ceil(this.player.loc.y / this.tileSize)).solid || this.getTile(x_near2, Math.ceil(this.player.loc.y / this.tileSize)).solid) {
        this.player.loc.y -= 0.1;
      }

      // tile bounce
      let bounce = 0;

      if (top1.solid && top1.bounce > bounce) {
        bounce = top1.bounce;
      }
      if (top2.solid && top2.bounce > bounce) {
        bounce = top2.bounce;
      }
      if (bottom1.solid && bottom1.bounce > bounce) {
        bounce = bottom1.bounce;
      }
      if (bottom2.solid && bottom2.bounce > bounce) {
        bounce = bottom2.bounce;
      }

      this.player.vel.y *= -bounce || 0;

      if ((bottom1.solid || bottom2.solid) && !tile.jump) {
        this.player.onFloor = true;
        this.player.canJump = true;
      }
    }


    // adjust camera
    let c_x = Math.round(this.player.loc.x - this.viewport.x / 2);
    let c_y = Math.round(this.player.loc.y - this.viewport.y / 2);
    let x_dif = Math.abs(c_x - this.camera.x);
    let y_dif = Math.abs(c_y - this.camera.y);

    if (x_dif > 5) {
      let mag = Math.round(Math.max(1, x_dif * 0.1));

      if (c_x !== this.camera.x) {
        this.camera.x += c_x > this.camera.x ? mag : -mag;

        if (this.limit_viewport) {
          this.camera.x = Math.min(this.currentMap.widthP - this.viewport.x + this.tileSize, this.camera.x);
          this.camera.x = Math.max(0, this.camera.x);
        }
      }
    }


    if (y_dif > 5) {
      let mag = Math.round(Math.max(1, y_dif * 0.1));

      if (c_y !== this.camera.y) {
        this.camera.y += c_y > this.camera.y ? mag : -mag;

        if (this.limitViewport) {
          this.camera.y = Math.min(this.currentMap.heightP - this.viewport.y + this.tileSize, this.camera.y);
          this.camera.y = Math.max(0, this.camera.y);
        }
      }
    }


    if (this.lastTile !== tile.id && tile.script) {
      switch (tile.script) {
        default:
          console.error(this.currentMap.scripts[tile.script]);
          break;
        case 'death':
          this.setState({ notification: 'You died! Try again ;)' });
          this.loadMap(firstLevel);
          break;
      }

      console.error(this.currentMap.scripts[tile.script]);

      //   change_colour: 'this.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
      // /* you could load a new map variable here */
      // next_level: 'alert("Yay! You won! Reloading map.");this.load_map(map);',
      // unlock: 'this.current_map.keys[10].solid = 0;this.current_map.keys[10].colour = "#888";'
    }

    this.lastTile = tile.id;
  }

  setViewport(x, y) {
    this.viewport.x = x;
    this.viewport.y = y;
  }

  loadMap(map) {
    if (typeof map === 'undefined' || typeof map.data === 'undefined' || typeof map.keys === 'undefined') {
      console.error('Error: Invalid map data!');
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

  drawTile(x, y, tile, context) {
    if (!tile || !tile.colour) {
      return;
    }

    context.fillStyle = tile.colour;
    context.fillRect(
      x,
      y,
      this.tileSize,
      this.tileSize
    );
  }

  drawMap(context, fore) {
    for (let y = 0; y < this.currentMap.data.length; y++) {
      for (let x = 0; x < this.currentMap.data[y].length; x++) {
        if ((!fore && !this.currentMap.data[y][x].fore) || (fore && this.currentMap.data[y][x].fore)) {

          let t_x = (x * this.tileSize) - this.camera.x;
          let t_y = (y * this.tileSize) - this.camera.y;

          if (t_x < -this.tileSize
            || t_y < -this.tileSize
            || t_x > this.viewport.x
            || t_y > this.viewport.y) {
            continue;
          }

          this.drawTile(
            t_x,
            t_y,
            this.currentMap.data[y][x],
            context
          );
        }
      }
    }

    if (!fore) {
      this.drawMap(context, true);
    }
  }

  drawPlayer(context) {
    context.fillStyle = this.player.colour;
    context.beginPath();

    context.arc(
      this.player.loc.x + this.tileSize / 2 - this.camera.x,
      this.player.loc.y + this.tileSize / 2 - this.camera.y,
      this.tileSize / 2 - 1,
      0,
      Math.PI * 2
    );

    context.fill();
  }

  draw(context) {
    this.drawMap(context, false);
    this.drawPlayer(context);
  }

  render() {
    let notificationPanel;

    if (this.state.notification !== '') {
      notificationPanel = <div
        style={{
          'width': this.canvasWidth,
          'backgroundColor': 'lime',
          'margin': '1rem auto',
          'textAlign': 'center',
        }}
      >
        {this.state.notification}
      </div>
    }

    return (
      <div>
        <canvas
          ref="canvas"
          width={this.canvasWidth}
          height={this.canvasHeight}
          style={{
            'margin': '40px auto 20px',
            'display': 'block',
          }}
        />
        {notificationPanel}
      </div>
    );
  }
}

export default Graphic;