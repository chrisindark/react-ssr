import Axios from 'axios';

import store from '../store';


export const fetchPhotosByAlbumId = async (id) => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? `http://jsonplaceholder.typicode.com/albums/${id}/photos`
    : `http://jsonplaceholder.typicode.com/albums/${id}/photos`;

  console.log(`Getting photos on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    let payload = {};
    if (res.data && res.data.length) {
      payload = Object.assign({}, {
        photos: res.data,
        totalCount: res.data.length
      });
    }
    return store.dispatch(updateAllPhotosAction(payload));
  } catch (e) {
    console.log(`fetchPhotosByAlbumId catch `, e);
  }
};

export const updateAllPhotosAction = (payload) => ({
  type: 'UPDATE_ALL_PHOTOS',
  payload: payload
});

export const removePhotosFromStore = async () => {
  const payload = {
    photos: [],
    totalCount: 0
  };
  return store.dispatch(updateAllPhotosAction(payload));
};
