// import React from 'react'
import React, { Component } from 'react';
import { SPRITE_SIZE } from '../../config/constants'
import { connect } from 'react-redux'
import './styles.scss'

import chestImage from './chest.png'
import rockImage from './rock.png'
import treeImage from './tree.png'

// class aze extends Component {}

function getTileSprite(type) {
  let output;

  if (type === 3 || type === 6) {
    output = treeImage
  } else if (type === 4) {
    output = chestImage
  } else if (type === 5) {
    output = rockImage
  }

  return output;
}

function MapTile(props) {
  return <div 
      className={`tile`}
      style={{
        backgroundImage: `url('${getTileSprite(props.tile)}')`,
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