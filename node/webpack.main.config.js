const path = require('path');

module.exports = () => {
  return {
    entry: {
      main: './src/app.ts',
      preload: './src/preload.ts',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
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
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
  };
};
