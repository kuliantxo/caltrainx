var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack
// var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
// var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    "./src/app.js"
  ],
  output: {
      path: __dirname + '/build',
      filename: "bundle.js"
  },
//    devtool: 'source-map',
  module: {
      loaders: [
          { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: /src/ },
//            { test: /\.js$/, include: /src/, loader: 'babel-loader'},
          {
            test: /\.less$/, loader: ExtractTextPlugin.extract(
              // activate source maps via loader query
              'css?sourceMap!' +
              'less?sourceMap'
            )
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          }
      ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};
