const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require( "friendly-errors-webpack-plugin" );

const dirname = __dirname + "/..";

const config = {
	context: dirname + '/app',
  entry: [
  	'./js/index.js',
		"webpack/hot/only-dev-server",
    "webpack-dev-server/client?http://localhost:8080",
  ],
  output: {
    path: dirname + '/dist',
    filename: 'bundle.[hash].js'
  },

  devServer: {
		hot: true,
    // overlay: true,
    quiet: true,
    contentBase: dirname + '/app',
  },

  module: {
    loaders: [
      {
        test: /\.js$/, //Check for all JS files
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': process.env.NODE_ENV
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: dirname + '/app/index.html',
      filename: dirname + '/dist/index.html',
      minify: { collapseWhitespace: true }
    }),
		new FriendlyErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'eval-source-map'
}

// Setting plugins for production
if (process.env.NODE_ENV === 'production') {
  config.devtool = '';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
  config.plugins.push(
    new CopyWebpackPlugin([
      { from: dirname + '/app/decoder.min.js', to:  dirname + '/dist/' },
    ])
  );
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    })
  );
}

module.exports = config;
