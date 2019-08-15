import Axios from 'axios';
import store from '../store';


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

export const updateAllCommentsAction = (payload) => ({
  type: 'UPDATE_ALL_COMMENTS',
  payload: payload
});

export const removeCommentsFromStore = async () => {
  const payload = {
    comments: [],
    totalCount: 0
  };
  return store.dispatch(updateAllCommentsAction(payload));
};
