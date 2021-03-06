import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import {reducer} from './reducers';


const loggerMiddleware = createLogger();

const INITIAL_REDUX_DATA = (typeof window !== "undefined" && window && window.REDUX_DATA) || {};

console.log('INITIAL_REDUX_DATA', INITIAL_REDUX_DATA);
export default (initialState => createStore(reducer, initialState,
    applyMiddleware(
        // loggerMiddleware // neat middleware that logs actions
    )
))(INITIAL_REDUX_DATA);
