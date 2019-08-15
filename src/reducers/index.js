import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { commentsReducer } from './commentsReducer';

export const reducer = combineReducers({
  // add more as needed
  posts: postsReducer,
  comments: commentsReducer
});
