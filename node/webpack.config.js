const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: './src/app/index.tsx',
    output: {
      path: path.join(__dirname, 'dist/app'),
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
  };
};
