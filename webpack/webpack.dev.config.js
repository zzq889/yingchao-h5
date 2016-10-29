var webpack = require('webpack');
var WebpackConfig = require('webpack-config');

var config = {
  content: __dirname,
  devtool: '#cheap-module-inline-eval-source-map',
  watch: true,
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.DEV_SERVER_PORT || 3000}`,
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(process.env.npm_package_version),
      __DEV__: true,  // <-------- DISABLE redux-devtools HERE
      __LOG_LEVEL__: JSON.stringify(process.env.LOG_LEVEL || 'trace'),
      __API_ROOT__: JSON.stringify(process.env.API_ROOT || 'http://lightapp.gsj987.cn'),
      __CANVAS_W__: JSON.stringify(414),
      __CANVAS_H__: JSON.stringify(736),
      __BG_COLOR__: JSON.stringify('f9e9bb'),
      __FG_COLOR__: JSON.stringify('0x0F380F'),
      // __ASSET_DIR__: JSON.stringify('assets'),
      __ASSET_DIR__: JSON.stringify('http://7oxin3.com1.z0.glb.clouddn.com/saucerank'),
    }),
  ],
};

module.exports = new WebpackConfig()
  .extend('./webpack/webpack.base.config.js')
  .merge(config);
