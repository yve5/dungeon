import React from 'react'
import { SPRITE_SIZE } from '../../config/constants'
import { connect } from 'react-redux'

import './styles.css'

function getTileSprite(type) {
  switch(type) {
    default:
    case 0:
      return 'grass'
    case 3:
      return 'tree'
    case 4:
      return 'chest'
    case 5:
      return 'rock'
    case 6:
      return 'tree'
  }
}

function MapTile(props) {
  return <div 
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    >&nbsp;</div>
}

function MapRow(props) {
  return props.tiles.map( tile => <MapTile tile={tile} /> )
}

function Map(props) {
  return (
    <div 
      style={{
        position: 'relative',
        left: '0',
        top: '0',
        width: '800px',
        height: '480px',
        border: '5px solid white',
        margin: '10px auto',
      }}
    >
      {
        props.tiles.map( row => <MapRow tiles={row} /> )
      }
    </div>
  )
}

function mapToStateToProps(state) {
  return {
    tiles: state.map.tiles,
  }
}

export default connect(mapToStateToProps)(Map)