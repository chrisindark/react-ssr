import Axios from 'axios';
import store from '../store';
import {updateAllCommentsAction} from './commentActions';


export const allPostsAction = data => {
  return {
    type: 'ALL_POSTS',
    posts: data
  };
};

export const updateAllPostsAction = data => ({
  type: 'UPDATE_ALL_POSTS',
  payload: data
});

export const fetchPosts = async () => {
  // If the API call is triggered on the server,
  // call the API server directly. When triggered from
  // browser, our proxy in package.json will handle the
  // request
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? 'http://jsonplaceholder.typicode.com/posts'
    : 'http://jsonplaceholder.typicode.com/posts';

  console.log(`Getting posts on ${isServer ? 'server' : 'browser'}`);

  // get the data
  try {
    const res = await Axios.get(url);
    let payload = {};
    if (res.data && res.data.length) {
      payload = Object.assign({}, {
        posts: res.data,
        totalCount: res.data.length
      });
    }
    return store.dispatch(updateAllPostsAction(payload));
  } catch (e) {
    console.log(`fetchPosts catch `, e);
  }
};

export const fetchPost = async (id) => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? `http://jsonplaceholder.typicode.com/posts/${id}`
    : `http://jsonplaceholder.typicode.com/posts/${id}`;

  console.log(`Getting post on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    let payload = {};
    if (res.data) {
      payload = Object.assign({}, {
        post: res.data
      });
    }
    return store.dispatch(updateAllPostsAction(payload));
  } catch (e) {
    console.log(`fetchPost catch `, e);
  }
};

export const fetchCommentsByPostId = async (id) => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? `http://jsonplaceholder.typicode.com/posts/${id}/comments`
    : `http://jsonplaceholder.typicode.com/posts/${id}/comments`;

  console.log(`Getting comments on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    let payload = {};
    if (res.data && res.data.length) {
      payload = Object.assign({}, {
        comments: res.data,
        totalCount: res.data.length
      });
    }
    return store.dispatch(updateAllCommentsAction(payload));
  } catch (e) {
    console.log(`fetchCommentsByPostId catch `, e);
  }
};

export const removeCommentsFromStore = async () => {
  const payload = {
    comments: [],
    totalCount: 0
  };
  return store.dispatch(updateAllCommentsAction(payload));
};

export const fetchAlbums = async () => {};
