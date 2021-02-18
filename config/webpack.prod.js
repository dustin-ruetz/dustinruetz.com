const webpackMerge = require('webpack-merge').merge
const webpackConfigCommon = require('./webpack.common.js')

module.exports = webpackMerge(webpackConfigCommon, {
  // https://webpack.js.org/guides/production/
  mode: 'production',
  // https://webpack.js.org/guides/production/#source-mapping
  devtool: 'source-map',
})
