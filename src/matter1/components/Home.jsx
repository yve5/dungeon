import React from 'react';
import Game from '../../shared/Game';
import Main from '../scenes/Main';

const Matter = () => (
  <Game
    options={{
      backgroundColor: '#000c1f',
      scale: {
        width: 800,
        height: 600,
      },
      physics: {
        default: 'matter',
      },
      scene: [Main],
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Matter;
