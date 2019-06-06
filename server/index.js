import React from'react';import express from'express';import{StaticRouter,matchPath}from'react-router';import{Provider as ReduxProvider}from'react-redux';import ReactDOMServer from'react-dom/server';import App from'../src/App';import store from'../src/store';import routes from'../src/routes';var path=require('path');var fs=require('fs');var request=require('request');var PORT=process.env.PORT||3000;var app=express();var router=express.Router();var distPath=path.resolve(__dirname,'../build');// main css, js
router.use('^/static',express.static(path.resolve(distPath,'static')));// service worker files, add other static content by modifying regex below
router.use('*/*.js',express.static(path.resolve(distPath)));// proxy api calls which are triggered from UI
// after the load of the first page
router.use('/api',function(req,res){var url='http://jsonplaceholder.typicode.com'+req.originalUrl.replace('/api','');req.pipe(request(url)).pipe(res);});// everything else i.e. application routes
router.use('*',function(req,res){var entry=path.resolve(distPath,'index.html');fs.readFile(entry,'utf8',function(err,htmlData){if(err){return res.status(404).end();}var context={};// empty promise array
var dataPromise=[];// extract route which matches request
var route=routes.filter(function(r){return matchPath(req.baseUrl,{path:r.path,exact:true});});// extract component based on route
var component=route.length?route[0].component:null;// if action are available
if(component&&typeof component.serverSideFetch==='function'){console.log("Found actions to dispatch for ".concat(req.url));// get actions
var actions=component.serverSideFetch();// dispatch and store promises
dataPromise=actions.map(function(action){return action();});}// once promises resolved, render template using new store
Promise.all(dataPromise).then(function(){console.log("Rendering ".concat(req.baseUrl," at ").concat(new Date().toString()," on server"));var html=ReactDOMServer.renderToString(React.createElement(ReduxProvider,{store:store},React.createElement(StaticRouter,{location:req.baseUrl,context:context},React.createElement(App,null))));return res.send(// render the template
htmlData.replace('<div id="root"></div>',"<div id=\"root\">".concat(html,"</div>")).replace('<script id="redux-state"></script>',// add the current store state to be used to initializing browser state
"<script>window.REDUX_DATA = ".concat(JSON.stringify(store.getState()),"</script>")));});});});app.use(router);app.listen(PORT,function(){console.log('listening on '+PORT+'...');});
