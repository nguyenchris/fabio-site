const path = require('path');

module.exports = {
  entry: {
    App: './assets/js/modules/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'production'
};
