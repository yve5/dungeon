import React, { Component } from 'react'
import { connect } from 'react-redux'
import walkSprite from './player_walk.png'

import handleMovement from './movement'

class Player extends Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        top: this.props.position[1],
        left: this.props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: this.props.spriteLocation,
        width: '40px',
        height: '40px',
      }} />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

export default connect(mapStateToProps)(handleMovement(Player))