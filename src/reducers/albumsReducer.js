const initialState = {
  albums: [],
  totalCount: 0
};

export const albumsReducer = (state = initialState, action) => {
  // console.log('albums reducer', action);
  switch (action.type) {
    case 'UPDATE_ALL_ALBUMS':
      const albums = Object.assign({}, action.payload);
      return {
        ...state, ...albums
      };
    case 'GET_ALBUM_DETAIL':
      const album = {
        album: Object.assign({}, action.album)
      };
      return {
        ...state, ...album
      };
    default:
      return state;
  }
};
