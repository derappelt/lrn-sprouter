var path = require('path');
module.exports = {
  entry: {
    app: ["./static/index.js"]
  },
  output: {
    path: './build',
    filename: 'lrn-sprouter.js'
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "static"),
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.js$/,
        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
    ]
  }
};