import React from 'react';
import Game from '../../shared/Game';
import Loading from '../scenes/Loading';
import Play from '../scenes/Play';

const Slope = () => (
  <Game
    options={{
      scale: {
        height: 320,
        width: 480,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
          fps: 60,
        },
      },
      pixelArt: true,
      scene: [Loading, Play],
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Slope;
