import React, { Component } from 'react';
import './Graphic.scss';

import { map } from '../../data/maps/2';

class Graphic extends Component {

  constructor(props) {
    super(props);
    // this.state = { rotation: 0 };
    this.height = 500;
    this.width = 500;

    this.setViewport(this.width, this.height);
    this.loadMap(map);
    // game.load_map(map);
    // game.limit_viewport = true;

    this.loop = this.loop.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.loop);
  }

  loop() {
    // const rotation = this.state.rotation + 0.04;
    // this.setState({ rotation });

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

  setViewport(x, y) {
    // this.viewport.x = x;
    // this.viewport.y = y;
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

    // this.player.loc.x = map.player.x * this.tileSize || 0;
    // this.player.loc.y = map.player.y * this.tileSize || 0;
    // this.player.colour = map.player.colour || '#000';

    // this.camera = {
    //   x: 0,
    //   y: 0
    // };

    // this.player.vel = {
    //   x: 0,
    //   y: 0
    // };

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