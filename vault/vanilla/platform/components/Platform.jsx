import React, { useEffect, useRef, useState } from 'react';

import DEFAULT_LEVEL from '../resources/Level2';
import { drawPlayer } from '../context/DrawPlayer';
import { drawMap } from '../context/DrawMap';
import { movePlayer } from '../scripts/MovePlayer';
import { loadMap } from '../scripts/LoadMap';
import { handleKey } from '../scripts/HandleKey';
import { handleTouch } from '../scripts/HandleTouch';

const Platform = ({ canvasHeight, canvasWidth }) => {
  const [platform, setPlatform] = useState({
    camera: {},
    map: {},
    viewport: {},
  });

  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
  });

  const [touchPositions, setTouchPositions] = useState({
    x: 0,
    y: 0,
  });

  const [currentTile, setCurrentTile] = useState({});

  const canvasRef = useRef();
  const requestRef = useRef();

  // const limitViewport = true;
  // let jumpsSwitch = 0;
  // let lastTile;

  const updatePlayer = () => {
    setPlatform(movePlayer(platform, keys));
  };

  const draw = (context) => {
    drawMap(context, platform);
    drawPlayer(context, platform);
    drawMap(context, platform, true);
  };

  const paint = () => {
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    updatePlayer();
    draw(ctx);
  };

  const loop = () => {
    if (platform?.map?.tileSize) {
      paint();
      requestRef.current = window.requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    setPlatform(loadMap(DEFAULT_LEVEL, canvasWidth, canvasHeight));
  }, []);

  const handleStart = ({ touches }) => {
    setTouchPositions({ x: touches[0].clientX, y: touches[0].clientY });
  };

  const handleEnd = () => {
    setKeys(handleTouch());
  };

  const handleMove = ({ touches }) => {
    setKeys(
      handleTouch(touches[0].clientX, touches[0].clientY, touchPositions)
    );
  };

  const handleKeyDown = ({ keyCode }) => {
    setKeys(handleKey(keyCode, keys));
  };

  const handleKeyUp = ({ keyCode }) => {
    setKeys(handleKey(keyCode, keys, false));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      document.addEventListener('touchstart', handleStart);
      document.addEventListener('touchend', handleEnd);
      document.addEventListener('touchmove', handleMove);
    }

    // if (currentTile?.id !== platform?.map?.lastTile?.id) {
    //   setCurrentTile((prevTile) => ({
    //     ...prevTile,
    //     ...platform?.map?.lastTile,
    //   }));

    //   if (platform?.map?.lastTile?.script) {
    //     const innerKeys = JSON.parse(JSON.stringify(platform.map.keys));

    //     switch (platform?.map?.lastTile?.script) {
    //       case 'death':
    //         setPlatform(loadMap(DEFAULT_LEVEL, canvasWidth, canvasHeight));
    //         console.error('You died! Try again.');
    //         break;

    //       case 'change_color':
    //         innerKeys[12].solid = 0;
    //         innerKeys[12].color = '#888';

    //         // setPlatform({
    //         //   ...platform,
    //         //   map: {
    //         //     ...platform.map,
    //         //     keys: innerKeys,
    //         //     player: {
    //         //       ...platform.map.player,
    //         //       color: '#FF0000',
    //         //     },
    //         //   },
    //         // });

    //         // currentMap.keys[12].solid = 0;
    //         // currentMap.keys[12].color = '#888';
    //         // player.color = '#FF0000';
    //         break;

    //       case 'unlock':
    //         // currentMap.keys[10].solid = 0;
    //         // currentMap.keys[10].color = '#888';
    //         break;

    //       case 'next_level':
    //         setPlatform(loadMap(DEFAULT_LEVEL, canvasWidth, canvasHeight));
    //         console.warn('Yay! You won! Reloading map.');
    //         break;

    //       default:
    //         console.error('Error with script.');
    //         break;
    //     }
    //   }
    // }

    requestRef.current = window.requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestRef.current);

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
        document.removeEventListener('touchstart', handleStart);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('touchmove', handleMove);
      }
    };
  });

  const innerStyle = {
    display: 'block',
    margin: '7rem auto',
  };

  // console.log(platform?.map?.player?.vel?.y);

  return (
    <canvas
      ref={canvasRef}
      height={canvasHeight}
      width={canvasWidth}
      style={canvasWidth < 800 ? null : innerStyle}
    />
  );
};

export default Platform;
