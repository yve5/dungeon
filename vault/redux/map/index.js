import React, { Component } from 'react';
import { SPRITE_SIZE } from '../../config/constants';
import { connect } from 'react-redux';
import './styles.css';

import chestImage from './assets/chest.png';
import rockImage from './assets/rock.png';
import treeImage from './assets/tree.png';

function getTileSprite(type) {
  let output;

  if (type === 3 || type === 6) {
    output = treeImage;
  } else if (type === 4) {
    output = chestImage;
  } else if (type === 5) {
    output = rockImage;
  }

  return output;
}

class MapTile extends Component {
  render() {
    return (
      <div
        className={`tile`}
        style={{
          backgroundImage: `url('${getTileSprite(this.props.tile)}')`,
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }}
      >
        &nbsp;
      </div>
    );
  }
}

function MapRow(props) {
  return props.tiles.map(tile => <MapTile tile={tile} />);
}

class Map extends Component {
  render() {
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
        {this.props.tiles.map(row => (
          <MapRow tiles={row} />
        ))}
      </div>
    );
  }
}

const mapToStateToProps = state => {
  return {
    tiles: state.map.tiles,
  };
};

export default connect(mapToStateToProps)(Map);
