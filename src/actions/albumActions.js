import Axios from 'axios';

import store from '../store';


export const fetchAlbums = async () => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? 'http://jsonplaceholder.typicode.com/albums'
    : 'http://jsonplaceholder.typicode.com/albums';

  console.log(`Getting albums on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    let payload = {};
    if (res.data && res.data.length) {
      payload = Object.assign({}, {
        albums: res.data,
        totalCount: res.data.length
      });
    }
    return store.dispatch(updateAllAlbumsAction(payload));
  } catch (e) {
    console.log(`fetchAlbums catch `, e);
  }
};

export const updateAllAlbumsAction = data => ({
  type: 'UPDATE_ALL_ALBUMS',
  payload: data
});

export const fetchAlbum = async (id) => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? `http://jsonplaceholder.typicode.com/albums/${id}`
    : `http://jsonplaceholder.typicode.com/albums/${id}`;

  console.log(`Getting album on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    if (res.data) {
      return store.dispatch(getAlbumDetail(res.data));
    }
  } catch (e) {
    console.log(`fetchAlbum catch `, e);
  }
};

export const getAlbumDetail = (album) => ({
  type: 'GET_ALBUM_DETAIL',
  album: album
});

export const removeAlbumsFromStore = async () => {
  const payload = {
    albums: [],
    totalCount: 0
  };
  return store.dispatch(updateAllAlbumsAction(payload));
};

export const removeAlbumFromStore = async () => {
  const album = {};
  return store.dispatch(getAlbumDetail(album));
};
