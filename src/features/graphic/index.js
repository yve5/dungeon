import React, { Component } from 'react';
import './styles.scss';

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

    console.info('Success !!!');
    
    // this.current_map = map;
    
    // this.current_map.background = map.background || '#333';
    // this.current_map.gravity = map.gravity || {x: 0, y: 0.3};
    // this.tile_size = map.tile_size || 16;
    
    // var _this = this;
    
    // this.current_map.width = 0;
    // this.current_map.height = 0;
    
    // map.keys.forEach(function (key) {
      
    //   map.data.forEach(function (row, y) {
        
    //     _this.current_map.height = Math.max(_this.current_map.height, y);
        
    //     row.forEach(function (tile, x) {
          
    //       _this.current_map.width = Math.max(_this.current_map.width, x);
          
    //       if (tile == key.id)
    //       _this.current_map.data[y][x] = key;
    //     });
    //   });
    // });
    
    // this.current_map.width_p = this.current_map.width * this.tile_size;
    // this.current_map.height_p = this.current_map.height * this.tile_size;
    
    // this.player.loc.x = map.player.x * this.tile_size || 0;
    // this.player.loc.y = map.player.y * this.tile_size || 0;
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