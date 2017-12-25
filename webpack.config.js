const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

// Base config
const config = {
  externals: /(rxjs\/Rx|Rx|rxjs)/,
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
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = [

  // Build as UMD module
  Object.assign(
    {},
    config,
    {
      entry: path.join(__dirname, 'src/scripts/lib/shift-block.js'),
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'shift-block.js',
        libraryTarget: 'umd',
        library: 'shift-block',
        umdNamedDefine: true
      }
    }
  ),

  // Build for using in browser
  // as <script src="...">
  Object.assign(
    {},
    config,
    {
      entry: {
        'shift-block': path.join(__dirname, 'src/scripts/lib/shift-block.js'),
        'shift-block.min': path.join(__dirname, 'src/scripts/lib/shift-block.js')
      },
      output: {
        path: path.join(__dirname, 'dist/global'),
        filename: '[name].js',
        libraryTarget: 'window',
        libraryExport: 'default',
        library: 'shift-block'
      },
      plugins: [
        new UglifyJsPlugin({
          test: /\.min\.js$/
        })
      ]
    }
  )

]
