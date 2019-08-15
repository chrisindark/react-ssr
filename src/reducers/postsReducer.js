const initialState = {
  posts: [],
  totalCount: 0
};

export const postsReducer = (state = initialState, action) => {
  // console.log('posts reducer', action);
  switch (action.type) {
    case 'ALL_POSTS':
      state.posts = Object.assign({}, action.posts);
      return state;
    case 'UPDATE_ALL_POSTS':
      state = Object.assign({}, state, action.payload);
      return state;
    case 'GET_POST_DETAIL':
      state.post = Object.assign({}, action.post);
      return state;
    default:
      return state;
  }
};
