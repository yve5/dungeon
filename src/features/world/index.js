import React, { Component } from 'react'
import Map from '../map'
import Player from '../player'

import { tiles } from '../../data/maps/1'
import store from '../../config/store'

class World extends Component {
  constructor(props) {
    super(props);
    
    store.dispatch({ type: 'ADD_TILES', payload: {
      tiles,
    } });
  }
  
  render() {
    return (
      <div 
        style={{
          position: 'relative',
          width: '800px',
          height: '400px',
          margin: '20px auto',
        }}
      >
        <Map tiles={tiles} />
        <Player />
      </div>
    );
  }
}

export default World