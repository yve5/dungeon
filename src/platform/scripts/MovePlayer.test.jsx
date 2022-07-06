import { movePlayer } from './MovePlayer';
import { SETTINGS } from '../resources/Settings';

const air = SETTINGS.keys[1];
const gro = SETTINGS.keys[2];
const wat = SETTINGS.keys[3];

const fakePlatform = {
  camera: {
    x: 17,
    y: 23,
  },
  map: {
    data: [
      [gro, gro, gro, gro, gro, gro, gro, gro, gro, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, air, air, air, air, air, air, air, air, gro],
      [gro, gro, gro, gro, gro, wat, wat, wat, wat, gro],
      [gro, gro, gro, gro, gro, wat, wat, wat, wat, gro],
      [gro, gro, gro, gro, gro, gro, gro, gro, gro, gro],
    ],
    tileSize: 16,
    player: {
      initial: { tileX: 2, tileY: 5 },
      loc: { x: 32, y: 80 },
      vel: { x: 0, y: 0 },
      canJump: true,
      color: '#FF9900',
    },
    gravity: { x: 0, y: 0.3 },
    velLimit: { x: 2, y: 16 },
    height: 144,
    width: 144,
  },
  viewport: {
    x: 100,
    y: 100,
  },
};

describe('MovePlayer', () => {
  xit('should handle player moves. undefined', () => {
    expect(movePlayer(undefined)).toEqual({});
  });

  xit('should handle player moves. default', () => {
    expect(movePlayer(fakePlatform)).toEqual({
      camera: { x: 13, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 32, y: 80.3 },
          vel: { x: 0, y: 0.3 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 13, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 32, y: 80.3 },
            vel: { x: 0.3, y: 0.3 },
          },
        },
      })
    ).toEqual({
      camera: { x: 10, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 32.3, y: 80.89999999999999 },
          vel: { x: 0.27, y: 0.6 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 10, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 32.3, y: 80.89999999999999 },
            vel: { x: 0.27, y: 0.6 },
          },
        },
      })
    ).toEqual({
      camera: { x: 7, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 32.57, y: 81.8 },
          vel: { x: 0.24300000000000002, y: 0.8999999999999999 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 7, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 32.57, y: 81.8 },
            vel: { x: 0.24300000000000002, y: 0.8999999999999999 },
          },
        },
      })
    ).toEqual({
      camera: { x: 5, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 32.813, y: 83 },
          vel: { x: 0.21870000000000003, y: 1.2 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 5, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 32.813, y: 83 },
            vel: { x: 0.21870000000000003, y: 1.2 },
          },
        },
      })
    ).toEqual({
      camera: { x: 3, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 33.0317, y: 84.5 },
          vel: { x: 0.19683000000000003, y: 1.5 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 3, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 33.0317, y: 84.5 },
            vel: { x: 0.19683000000000003, y: 1.5 },
          },
        },
      })
    ).toEqual({
      camera: { x: 1, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 33.22853, y: 86.3 },
          vel: { x: 0.17714700000000003, y: 1.8 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 1, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 33.22853, y: 86.3 },
            vel: { x: 0.17714700000000003, y: 1.8 },
          },
        },
      })
    ).toEqual({
      camera: { x: 0, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 33.405677, y: 88.39999999999999 },
          vel: { x: 0.15943230000000003, y: 2.1 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    expect(
      movePlayer({
        ...fakePlatform,
        camera: { x: 0, y: 0 },
        map: {
          ...fakePlatform.map,
          player: {
            ...fakePlatform.map.player,
            loc: { x: 32, y: 88.39999999999999 },
            vel: { x: 0, y: 2.1 },
          },
        },
      })
    ).toEqual({
      camera: { x: 0, y: 0 },
      map: {
        ...fakePlatform.map,
        player: {
          ...fakePlatform.map.player,
          loc: { x: 32, y: 90.8 },
          vel: { x: 0, y: 2.4 },
        },
      },
      viewport: {
        x: 100,
        y: 100,
      },
    });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 90.8 },
    //         vel: { x: 0, y: 2.4 },
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 93.5 },
    //       vel: { x: 0, y: 2.6999999999999997 },
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 93.5 },
    //         vel: { x: 0, y: 2.6999999999999997 },
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.90000000000003 },
    //       vel: { x: 0, y: -1.0499999999999998 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.90000000000003 },
    //         vel: { x: 0, y: -1.0499999999999998 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.15000000000003 },
    //       vel: { x: 0, y: -0.7499999999999998 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.15000000000003 },
    //         vel: { x: 0, y: -0.7499999999999998 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 94.70000000000003 },
    //       vel: { x: 0, y: -0.4499999999999998 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 94.70000000000003 },
    //         vel: { x: 0, y: -0.4499999999999998 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 94.55000000000003 },
    //       vel: { x: 0, y: -0.1499999999999998 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 94.55000000000003 },
    //         vel: { x: 0, y: -0.1499999999999998 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 94.70000000000003 },
    //       vel: { x: 0, y: 0.1500000000000002 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 94.70000000000003 },
    //         vel: { x: 0, y: 0.1500000000000002 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.15000000000003 },
    //       vel: { x: 0, y: 0.4500000000000002 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.15000000000003 },
    //         vel: { x: 0, y: 0.4500000000000002 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.90000000000003 },
    //       vel: { x: 0, y: 0.7500000000000002 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.90000000000003 },
    //         vel: { x: 0, y: 0.7500000000000002 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.95000000000009 },
    //       vel: { x: 0, y: -0.36750000000000005 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.95000000000009 },
    //         vel: { x: 0, y: -0.36750000000000005 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.88250000000009 },
    //       vel: { x: 0, y: -0.06750000000000006 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.88250000000009 },
    //         vel: { x: 0, y: -0.06750000000000006 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.9150000000001 },
    //       vel: { x: 0, y: -0.08137499999999998 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.9150000000001 },
    //         vel: { x: 0, y: -0.08137499999999998 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.93362500000012 },
    //       vel: { x: 0, y: -0.07651875 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.93362500000012 },
    //         vel: { x: 0, y: -0.07651875 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.95710625000014 },
    //       vel: { x: 0, y: -0.07821843749999999 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.95710625000014 },
    //         vel: { x: 0, y: -0.07821843749999999 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.97888781250015 },
    //       vel: { x: 0, y: -0.07762354687499999 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.97888781250015 },
    //         vel: { x: 0, y: -0.07762354687499999 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.90126426562516 },
    //       vel: { x: 0, y: -0.07783175859375 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.90126426562516 },
    //         vel: { x: 0, y: -0.07783175859375 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.92343250703142 },
    //       vel: { x: 0, y: -0.0777588844921875 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.92343250703142 },
    //         vel: { x: 0, y: -0.0777588844921875 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.94567362253925 },
    //       vel: { x: 0, y: -0.07778439042773437 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.94567362253925 },
    //         vel: { x: 0, y: -0.07778439042773437 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.96788923211152 },
    //       vel: { x: 0, y: -0.07777546335029295 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.96788923211152 },
    //         vel: { x: 0, y: -0.07777546335029295 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.99011376876123 },
    //       vel: { x: 0, y: -0.07777858782739745 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.99011376876123 },
    //         vel: { x: 0, y: -0.07777858782739745 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.91233518093385 },
    //       vel: { x: 0, y: -0.07777749426041089 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.91233518093385 },
    //         vel: { x: 0, y: -0.07777749426041089 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.93455768667346 },
    //       vel: { x: 0, y: -0.07777787700885617 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.93455768667346 },
    //         vel: { x: 0, y: -0.07777787700885617 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.95677980966461 },
    //       vel: { x: 0, y: -0.07777774304690033 },
    //       onFloor: true,
    //     },
    //   },
    // });

    // expect(
    //   movePlayer({
    //     ...fakePlatform,
    //     map: {
    //       ...fakePlatform.map,
    //       player: {
    //         ...fakePlatform.map.player,
    //         loc: { x: 32, y: 95.95677980966461 },
    //         vel: { x: 0, y: -0.07777774304690033 },
    //         onFloor: true,
    //       },
    //     },
    //   })
    // ).toEqual({
    //   camera: fakePlatform.camera,
    //   map: {
    //     ...fakePlatform.map,
    //     player: {
    //       ...fakePlatform.map.player,
    //       loc: { x: 32, y: 95.97900206661772 },
    //       vel: { x: 0, y: -0.07777778993358488 },
    //       onFloor: true,
    //     },
    //   },
    // });
  });
});
