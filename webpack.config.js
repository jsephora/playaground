const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const PerfectScrollbar = require('perfect-scrollbar');

const IS_DEV = process.env.NODE_ENV === 'dev'

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: IS_DEV
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/[name].[ext]?[hash:7]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true,
            },
          },
        ],
      },
      // font-awesome
      /*      {
        test: /font-awesome\.config\.js/,
        use: [{ loader: 'style-loader' }, { loader: 'font-awesome-loader' }],
      },*/
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: 'public',
      },
    ]),
    new HtmlWebPackPlugin({
      template: 'index.html',
      favicon: './public/icon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
    }),
    new HtmlWebPackPlugin({
      filename: 'brs-tax-registrations.html',
      template: 'src/brs-tax-registrations.html',
    }),
    new HtmlWebPackPlugin({
      filename: 'index-sidebar.html',
      template: 'src/index-sidebar.html',
    }),
    new HtmlWebPackPlugin({
      filename: 'vanguard.html',
      template: 'src/vanguard.html',
    }),
    new HtmlWebPackPlugin({
      filename: 'brs-home.html',
      template: 'src/brs-home.html',
    }),
    //new PerfectScrollbar('#container'),
    new ExtractTextPlugin('styles.css'),
  ],
}

if (!IS_DEV) {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: false,
    })
  )
}

module.exports = config
