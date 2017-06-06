var path = require('path')
var webpack = require('webpack')

const FILE_LOADER = (test, mimetype, url) => {
  return {
    test,
    loader: url ? 'url-loader' : 'file-loader',
    query: {
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype
    }
  }
}

const fileLoaders = [
  FILE_LOADER(/\.woff(\?.*)?$/,  'application/font-woff', true),
  FILE_LOADER(/\.woff2(\?.*)?$/, 'application/font-woff2', true),
  FILE_LOADER(/\.otf(\?.*)?$/,   'font/opentype'),
  FILE_LOADER(/\.ttf(\?.*)?$/,   'application/octet-stream', true),
  FILE_LOADER(/\.eot(\?.*)?$/,   'application/vnd.ms-fontobject'),
  FILE_LOADER(/\.svg(\?.*)?$/,   'image/svg+xml', true),
  { test: /\.(png|jpg)$/, loader: 'url-loader', query: { limit: 8192 } }
]

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'vue-loader',
            options: {
              esModule: true,
              cssModules: {
                localIdentName: '[path][name]---[local]---[hash:base64:5]',
                camelCase: true
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    , ...fileLoaders]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
