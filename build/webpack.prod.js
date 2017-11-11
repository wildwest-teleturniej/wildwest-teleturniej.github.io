/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const webpack = require( "webpack" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const cssLoaders = require( "./css-loaders" );
const common = require( "./common" );

const { config, iP } = common;

const ExtractSASSConfig = {
  filename: "style.[hash].css",
};
const ExtractSASS = new ExtractTextPlugin( ExtractSASSConfig );

module.exports = {
  entry: config.entry,

  output: config.output,
  resolve: config.resolve,

  module: {
    rules: [
      ...config.rules,
      {
        test: /\.s[ca]ss$/,
        use: ExtractSASS.extract( {
          fallback: "style-loader",
          use: cssLoaders( iP ),
        } ),
      },
    ],
  },

  plugins: [
    ...config.plugins,
    new webpack.optimize.ModuleConcatenationPlugin(),
    ExtractSASS,
    new CopyWebpackPlugin( [
      { context: "./static", from: "**/*", to: "./" },
    ] ),
  ],
};
