import React from 'react'

function MapTile(props) {
  return <div>0</div>
}

function MapRow(props) {
  return props.tiles.map( tile => <MapTile value={tile} /> )
}

function Map(props) {
  return (
    <div 
      style={{
        position: 'relative',
        left: '0',
        top: '0',
        width: '800px',
        height: '400px',
        border: '1px solid red',
        margin: '10px auto',
      }}
    >
      {
        props.tiles.map( row => <MapRow tiles={row} /> )
      }
    </div>
  )
}

export default Map