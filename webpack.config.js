const path = require('path');

module.exports = {
  entry: './src/client/game.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          outputPath: 'assets',
          publicPath: 'dist/assets',
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
