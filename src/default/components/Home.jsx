import React from 'react';
import Game from '../../shared/Game';
import Platformer from '../scenes/Platformer';

const Default = () => (
  <Game
    options={{
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: true,
        },
      },
      scene: [Platformer],
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Default;
