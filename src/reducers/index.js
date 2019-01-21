import { combineReducers } from 'redux';


const postsReducer = (state = [], action) => {
    // console.log('here reducer', action);
    switch (action.type) {
        case 'STORE_POSTS':
            return action.posts;
        default:
            return state;
    }
};

export const reducer = combineReducers({
    // add more as needed
    posts: postsReducer
});
