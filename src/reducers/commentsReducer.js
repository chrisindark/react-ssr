const initialState = {
  comments: [],
  totalCount: 0
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_COMMENTS':
      const comments = Object.assign({}, state, action.payload);
      return {
        ...state, ...comments
      };
    default:
      return state;
  }
};
