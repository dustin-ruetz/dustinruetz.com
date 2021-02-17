const webpackMerge = require('webpack-merge').merge
const webpackConfigCommon = require('./webpack.common.js')

module.exports = webpackMerge(webpackConfigCommon, {
  // https://webpack.js.org/guides/production/
  mode: 'production',
  // https://webpack.js.org/guides/production/#source-mapping
  devtool: 'source-map',
  output: {
    /**
     * set `clean` to delete directories/files that are no longer being required
     *
     * note: setting `clean` in webpack.common.js was causing the dev server to
     * lose image require()s (i.e. images would initially be outputted on the
     * server but would then be removed after modifying/saving files); due to
     * this issue I'm only enabling this option for the production build
     */
    clean: true,
  },
})
