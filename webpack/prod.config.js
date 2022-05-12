'use strict'

const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const common = require('./common')

const Crp = MiniCssExtract
const Styles = MiniCssExtract

module.exports = {
  mode: 'production',

  entry: common.entry,

  output: common.output,

  optimization: {
    splitChunks: {
      cacheGroups: {
        preact: {
          test: /[\\/]preact[\\/]/,
          name: 'preact',
          chunks: 'all'
        },
        highlight: {
          test: /[\\/]highlight.js[\\/]/,
          name: 'highlight',
          chunks: 'all'
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),

    new Crp({
      filename: 'Crp.css'
    }),
    new Styles({
      filename: '[name]-[chunkhash].css'
    }),

    new HtmlPlugin(
      Object.assign({}, common.HtmlPluginConfig('template.html'), {
        inject: false,
        minify: true,
        chunksSortMode: 'manual',
        chunks: ['preact', 'commons', 'main', 'highlight']
      })
    )
  ].concat(
    process.env.ANALYZER ? new BundleAnalyzerPlugin() : []
  ),

  module: {
    rules: [
      common.standardLoader,
      common.jsLoader,

      Object.assign({}, common.cssLoader, {
        exclude: /none_modules|(search|style)\.css/,
        use: [Styles.loader, 'css-loader']
      }),

      Object.assign({}, common.cssLoader, {
        test: /(search|style)\.css$/,
        use: [Crp.loader, 'css-loader']
      })
    ]
  },

  resolve: {
    alias: Object.assign({}, common.resolve.alias, {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    })
  }
}
