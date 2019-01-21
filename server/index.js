'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _App = require('../src/App');

var _App2 = _interopRequireDefault(_App);

var _store = require('../src/store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('../src/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
var request = require('request');

var PORT = process.env.PORT || 3000;
var app = (0, _express2.default)();
var router = _express2.default.Router();
var distPath = path.resolve(__dirname, '../build');

// main css, js
router.use('^/static', _express2.default.static(path.resolve(distPath, 'static')));

// service worker files, add other static content by modifying regex below
router.use('*/*.js', _express2.default.static(path.resolve(distPath)));

// proxy api calls which are triggered from UI
// after the load of the first page
router.use('/api', function (req, res) {
    var url = 'http://jsonplaceholder.typicode.com' + req.originalUrl.replace('/api', '');
    req.pipe(request(url)).pipe(res);
});

// everything else i.e. application routes
router.use('*', function (req, res) {
    var entry = path.resolve(distPath, 'index.html');

    fs.readFile(entry, 'utf8', function (err, htmlData) {
        if (err) {
            return res.status(404).end();
        }

        var context = {};
        // empty promise array
        var dataPromise = [];

        // extract route which matches request
        var route = _routes2.default.filter(function (r) {
            return (0, _reactRouter.matchPath)(req.baseUrl, {
                path: r.path,
                exact: true
            });
        });

        // extract component based on route
        var component = route.length ? route[0].component : null;

        // if action are available
        if (component && typeof component.serverSideFetch === 'function') {
            console.log('Found actions to dispatch for ' + req.url);

            // get actions
            var actions = component.serverSideFetch();
            console.log(actions);

            // dispatch and store promises
            dataPromise = actions.map(function (action) {
                console.log('heree', action);
                return _store2.default.dispatch(action());
            });
        }

        // once promises resolved, render template using new store
        Promise.all(dataPromise).then(function () {
            console.log('Rendering ' + req.baseUrl + ' at ' + new Date().toString() + ' on server');

            var html = _server2.default.renderToString(_react2.default.createElement(
                _reactRedux.Provider,
                { store: _store2.default },
                _react2.default.createElement(
                    _reactRouter.StaticRouter,
                    { location: req.baseUrl, context: context },
                    _react2.default.createElement(_App2.default, null)
                )
            ));

            return res.send(
            // render the template
            htmlData.replace('<div id="root"></div>', '<div id="root">' + html + '</div>').replace('<script id="redux-state"></script>',
            // add the current store state to be used to initializing browser state
            '<script>window.REDUX_DATA = ' + JSON.stringify(_store2.default.getState()) + '</script>'));
        });
    });
});

app.use(router);

app.listen(PORT, function () {
    console.log('listening on ' + PORT + '...');
});
