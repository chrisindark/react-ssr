import Axios from 'axios';
import store from '../store';


export const storePostsAction = data => {
    // console.log('here action', data);
    return {
        type: 'STORE_POSTS',
        posts: data
    };
};

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
    const res = await Axios.get(url);
    store.dispatch(storePostsAction(res.data));
};
