var webpack = require('webpack');
var path = require('path');
 
module.exports = {

  entry: {
    index : './src/index.jsx'
  },
  output: {
    path: 'dist/',
    filename: 'index.js',
    library: 'shared-components',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  ]

};