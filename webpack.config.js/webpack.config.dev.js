const baseConfig = require('./webpack.config.base');


const config = {
  ...baseConfig,
  plugins: [
    // new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  devtool: generateSourceMap ? 'cheap-module-inline-source-map' : false,
  performance: {
    hints: false,
  },
};
