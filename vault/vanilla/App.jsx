import React, { useEffect, useState } from 'react';
import Platform from './platform';

const App = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const isSmall = window.innerWidth < 800;

    setHeight(isSmall ? window.innerHeight - 20 : 450);
    setWidth(isSmall ? window.innerWidth - 20 : 800);
  }, []);

  return height ? <Platform canvasHeight={height} canvasWidth={width} /> : null;
};

export default App;
