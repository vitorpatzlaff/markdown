'use strict'

const common = require('../webpack/common')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],

  framework: '@storybook/react',

  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config) => {
    config.resolve.alias = common.resolve.alias
    config.module.noParse = common.module.noParse
    return config
  }
}
