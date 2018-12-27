const initialState = {
  tiles: [],
}

const playerReducer = (state=initialState, action) => {
  if (action.type === 'ADD_TILES') {
    return {
      ...action.payload
    }
  }
  
  return state;
}

export default playerReducer;