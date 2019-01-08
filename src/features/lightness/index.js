import React, { Component } from 'react';
import './styles.scss';

class Lightness extends Component {

  constructor(props) {
    super(props);
    this.canvasHeight = 400;
    this.canvasWidth = 640;
  }
  
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);

    console.log('hello', 'componentDidMount');
    
    this.loop();
  }

  loop() {
    console.log('hello', 'world');
    // window.requestAnimationFrame(this.loop());
  }
  
  render() {
    return (
      <canvas ref="canvas" width={this.canvasWidth} height={this.canvasHeight} />
    );
  }
}

export default Lightness;