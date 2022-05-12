'use strict'

const { join } = require('path')

const paths = {
  node_modules: join(__dirname, '..', 'node_modules'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist')
}

module.exports = {
  entry: {
    main: join(paths.src, 'index')
  },

  output: {
    filename: '[name]-[chunkhash].js',
    path: paths.dist
  },

  HtmlPluginConfig: (template) => ({
    title: 'Markdown Editor',
    template: join(paths.src, 'html', template)
  }),

  standardLoader: {
    test: /\.js$/i,
    include: paths.src,
    enforce: 'pre',
    use: 'standard-loader'
  },

  jsLoader: {
    test: /\.js$/i,
    include: paths.src,
    use: 'babel-loader'
  },

  cssLoader: {
    test: /\.css$/i,
    include: [
      paths.src,
      join(paths.node_modules, 'normalize.css'),
      join(paths.node_modules, 'highlight.js', 'styles')
    ],
    use: ['style-loader', 'css-loader']
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: paths.src,
      components: join(paths.src, 'components'),
      utils: join(paths.src, 'utils'),
      assets: join(paths.src, 'assets'),
      css: join(paths.src, 'css'),
      views: join(paths.src, 'views')
    }
  }
}
