import React, { Component } from 'react'
import World from './features/world'
import Canvarea from './features/canvarea';

class App extends Component {
  render() {
    return (
      <div>
        <Canvarea />
        <World />
      </div>
    );
  }
}

export default App;