const initialState = {
  posts: [],
  totalCount: 0
};

export const postsReducer = (state = initialState, action) => {
  // console.log('posts reducer', action);
  switch (action.type) {
    case 'UPDATE_ALL_POSTS':
      const posts = Object.assign({}, action.payload);
      return {
        ...state, ...posts
      };
    case 'GET_POST_DETAIL':
      const post = {
        post: Object.assign({}, action.post)
      };
      return {
        ...state, ...post
      };
    default:
      return state;
  }
};
