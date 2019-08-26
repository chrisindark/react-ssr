import express from 'express';

import React from 'react';
import { StaticRouter, matchPath } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';

import App from '../src/App';
// import store from '../src/store';
import routes from '../src/routes';
import {reducer} from '../src/reducers';

const path = require('path');
const fs = require('fs');
const request = require('request');

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();
const distPath = path.resolve(__dirname, '../build');

// main css, js
router.use('^/static', express.static(path.resolve(distPath, 'static')));

// service worker files, add other static content by modifying regex below
router.use('*/*.js', express.static(path.resolve(distPath)));

// proxy api calls which are triggered from UI
// after the load of the first page
router.use('/api', (req, res) => {
    const url =
        'http://jsonplaceholder.typicode.com' + req.originalUrl.replace('/api', '');
    req.pipe(request(url)).pipe(res);
});

// everything else i.e. application routes
router.use('*', (req, res) => {
    const entry = path.resolve(distPath, 'index.html');

    fs.readFile(entry, 'utf8', (err, htmlData) => {
        if (err) {
            return res.status(404).end();
        }

        const context = {};
        let REDUX_DATA = {};
        // empty promise array
        let dataPromise = [];

        // Create a new Redux store instance
        const store = createStore(reducer);

        // extract route which matches request
        const route = routes.find(r => matchPath(req.baseUrl, r));
        const match = matchPath(req.baseUrl, route);

        // extract component based on route
        const component = route
            ? route.component
            : null;

        // if action are available
        if (component && typeof component.serverSideFetch === 'function') {
            console.log(`Found actions to dispatch for ${req.url}`);

            // get actions
            const actions = component.serverSideFetch();

            // dispatch and store promises
            dataPromise = actions.map(action => {
                return action(store, match);
            });
        }

        // once promises resolved, render template using new store
        Promise.all(dataPromise).then(() => {
            REDUX_DATA = store.getState();
            console.log(`Redux data : ${JSON.stringify(REDUX_DATA)}`);
            console.log(`Rendering ${req.baseUrl} at ${new Date().toString()} on server`);

            const html = ReactDOMServer.renderToString(
                <ReduxProvider store={store}>
                    <StaticRouter location={req.baseUrl} context={context}>
                        <App />
                    </StaticRouter>
                </ReduxProvider>
            );

            return res.send(
                // render the template
                htmlData
                    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                    .replace(
                        '<script id="redux-state"></script>',
                        // add the current store state to be used to initializing browser state
                        `<script>window.REDUX_DATA = ${JSON.stringify(
                          REDUX_DATA
                        )}</script>`
                    )
            );
        });
    });
});

app.use(router);

app.listen(PORT, () => {
    console.log('listening on ' + PORT + '...');
});
