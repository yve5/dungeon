import React, { Component } from 'react';

class Canvarea extends Component {
  
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
  }

  render() {
    return (
      <canvas ref="canvas" width={640} height={425} />
    );
  }
}

export default Canvarea;