const initialState = {
  comments: [],
  totalCount: 0
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_COMMENTS':
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state;
  }
};
