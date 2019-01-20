import React from 'react';
import ReactDOM from 'react-dom';
import Graphic from './Graphic';

describe('Graphic', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Graphic />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});