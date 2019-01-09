import React, { Component } from 'react';
import './styles.scss';

class Graphic extends Component {

  constructor(props) {
    super(props);
    this.state = { rotation: 0 };
    this.height = 400;
    this.width = 640;

    this.loop = this.loop.bind(this);
  }
  
  componentDidMount() {
    window.requestAnimationFrame(this.loop);
  }

  loop() {
    const rotation = this.state.rotation + 0.04;
    this.setState({ rotation });

    this.paint();
    
    window.requestAnimationFrame(this.loop);
  }

  paint() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(this.state.rotation, 100, 100);
    ctx.fillStyle = "#F00";
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
  }
  
  render() {
    return (
      <canvas ref="canvas" width={this.width} height={this.height} />
    );
  }
}

export default Graphic;