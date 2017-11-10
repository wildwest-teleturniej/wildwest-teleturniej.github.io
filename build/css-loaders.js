/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const autoprefixer = require( "autoprefixer" );
const tailwindcss = require( "tailwindcss" );

module.exports = iP => [
  {
    loader: "css-loader",
    options: {
      sourceMap: !iP,
    },
  }, {
    loader: "postcss-loader",
    options: {
      sourceMap: !iP,
      plugins: () => [
        autoprefixer(),
        tailwindcss( "./tailwind.js" ),
      ],
    },
  }, {
    loader: "sass-loader",
    options: {
      sourceMap: !iP,
      data: "@import 'src/sass/style'",
    },
  },
];
