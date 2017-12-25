const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {

  entry: {
    index: path.join(__dirname, 'src/scripts/index.js'),
    'with-screen-viewer': path.join(__dirname, 'src/scripts/with-screen-viewer.js')
  },

  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'shift block',
      filename: path.join(__dirname, 'docs/index.html'),
      template: 'src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'shift block with screen viewer',
      filename: path.join(__dirname, 'docs/with-screen-viewer.html'),
      template: 'src/with-screen-viewer.html',
      chunks: ['with-screen-viewer']
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    host: '0.0.0.0',
    port: 3030,
    open: 'http://localhost:3030/'
  },

  watchOptions: {
    aggregateTimeout: 100
  }

}
