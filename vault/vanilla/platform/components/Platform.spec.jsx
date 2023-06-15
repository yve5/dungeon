import React from 'react';
import ReactDOM from 'react-dom';
import Platform from './Platform';

describe('Platform', () => {
  xit('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Platform />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  xit('initializes player and camera when map is loading.', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<Platform />, div);

    expect(component.player).toEqual({
      loc: {
        x: 32,
        y: 32,
      },
      vel: {
        x: 0,
        y: 0,
      },
      canJump: true,
      color: '#FF9900',
    });

    expect(component.camera).toEqual({
      x: 0,
      y: 0,
    });
  });
});
