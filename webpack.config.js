module.exports = {
  context: __dirname,
  entry: './scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  resolve: {
    modules: ['scripts', 'node_modules']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: ['es2015', 'react'],
          cacheDirectory: true,
          plugins: ['transform-strict-mode', 'transform-object-rest-spread', 'es6-promise']
        },
      }
    ]
  }
};
