// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom/extend-expect';

class canvas2dContextMock {
  constructor() {
    this.logs = [];
    this.fillStyle = '';
  }

  arc(...args) {
    this.logs.push({
      type: 'arc',
      args,
      fillStyle: this.fillStyle,
    });
  }

  beginPath() {
    this.logs.push({
      type: 'beginPath',
    });
  }

  fill() {
    this.logs.push({
      type: 'fill',
      fillStyle: this.fillStyle,
    });
  }

  fillRect(...args) {
    this.logs.push({
      type: 'fillRect',
      args,
      fillStyle: this.fillStyle,
    });
  }
}

global.canvas2dContext = canvas2dContextMock;
