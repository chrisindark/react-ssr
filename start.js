// Plugin into node's require function
// require('babel-register')({
//     presets: ['babel-preset-env', 'babel-preset-react']
// });
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});

// provide polyfills
//require('babel-polyfill');
require("@babel/polyfill");



// ignore styles
require('ignore-styles');

// start server
// require('./server');

require('./server/server');
