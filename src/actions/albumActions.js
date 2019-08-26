import Axios from 'axios';

import store from '../store';


export const fetchAlbums = async (ssrStore) => {
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? 'http://jsonplaceholder.typicode.com/albums'
    : 'http://jsonplaceholder.typicode.com/albums';
  const reduxStore = ssrStore ? ssrStore : store;

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
    return reduxStore.dispatch(updateAllAlbumsAction(payload));
  } catch (e) {
    console.log(`fetchAlbums catch `, e);
  }
};

export const updateAllAlbumsAction = data => ({
  type: 'UPDATE_ALL_ALBUMS',
  payload: data
});

export const fetchAlbum = async (ssrStore, match) => {
  const isServer = typeof window === 'undefined';
  const id = match
    ? match.params
      ? match.params.id
      : null
    : null;
  const url = isServer
    ? `http://jsonplaceholder.typicode.com/albums/${id}`
    : `http://jsonplaceholder.typicode.com/albums/${id}`;
  const reduxStore = ssrStore ? ssrStore : store;

  console.log(`Getting album on ${isServer ? 'server' : 'browser'}`);

  try {
    const res = await Axios.get(url);
    if (res.data) {
      return reduxStore.dispatch(getAlbumDetail(res.data));
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
