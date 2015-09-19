'use strict';

const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, './build/main.js'),
    "service-worker": path.join(__dirname, './build/service-worker.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './')
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  bail: false
};
