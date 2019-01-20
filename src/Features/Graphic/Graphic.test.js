import React from 'react';
import ReactDOM from 'react-dom';
import Graphic from './Graphic';

describe('Graphic', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Graphic />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('initializes player and camera when map is loading.', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<Graphic />, div);

    expect(component.player).toEqual({
      loc: {
        x: 32,
        y: 32
      },
      vel: {
        x: 0,
        y: 0
      },
      can_jump: true,
      colour: "#FF9900"
    });

    expect(component.camera).toEqual({
      x: 0,
      y: 0
    });
  });
});