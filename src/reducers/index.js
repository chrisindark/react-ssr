import {combineReducers} from 'redux';
import {postsReducer} from './postsReducer';
import {commentsReducer} from './commentsReducer';
import {albumsReducer} from './albumsReducer';
import {photosReducer} from './photosReducer';

export const reducer = combineReducers({
  // add more as needed
  posts: postsReducer,
  comments: commentsReducer,
  albums: albumsReducer,
  photos: photosReducer
});
