module.exports = (env = 'production') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return [require('./webpack.config.dev'), require('./server.dev')];
  }
  process.env.NODE_ENV = 'production';
  return [require('./webpack.config.prod'), require('./server.prod')];
};
