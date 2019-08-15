const initialState = {
  photos: [],
  totalCount: 0
};

export const photosReducer = (state = initialState, action) => {
  // console.log('photos reducer', action);
  switch (action.type) {
    case 'UPDATE_ALL_PHOTOS':
      const photos = Object.assign({}, action.payload);
      return {
        ...state, ...photos
      };
    case 'GET_PHOTO_DETAIL':
      const photo = {photo: Object.assign({}, state.photo, action.photo)};
      return {
        ...state, ...photo
      };
    default:
      return state;
  }
};
