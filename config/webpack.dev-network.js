const webpackMerge = require('webpack-merge').merge
const {getURL, URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDev = require('./webpack.dev.js')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDev, {
  devServer: {
    // specify host to access server from other devices on the network
    host: URL.domain.network,
    // print info when server starts listening for connections on the specified port
    onListening: () => {
      /* eslint-disable no-console */
      console.log('Network server:')
      console.log(`  ${getURL('network')}`)
      console.log('') // print empty line
      /* eslint-enable no-console */
    },
    port: URL.port.network,
    // specify public to fix "invalid host header" error
    public: URL.domain.network,
  },
})
