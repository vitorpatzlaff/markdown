'use strict'

const webpack = require('webpack')

const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const Dashboard = require('webpack-dashboard/plugin')

module.exports = {
  devtool: 'source-map',
  entry: common.entry.main,
  mode: 'development',

  output: Object.assign({}, common.output, {
    filename: '[name].js',
    publicPath: ''
  }),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dashboard(),

    new HtmlPlugin(
      common.HtmlPluginConfig('template-dev.html')
    ),

    new MiniCssExtract({
      filename: '[name].css'
    })
  ],

  module: {
    rules: [
      common.standardLoader,
      common.jsLoader,
      common.cssLoader
    ]
  },

  devServer: {
    historyApiFallback: true,
    port: 1200,
    hot: true,
    client: {
      overlay: false
    }
  },

  resolve: common.resolve
}
