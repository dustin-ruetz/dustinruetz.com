const webpackMerge = require('webpack-merge').merge
const {getURL, URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDevelopment = require('./webpack.development.js')
const {logURL} = require('./utils/log-url.js')

const networkURL = getURL('network')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
  devServer: {
    // specify host to access server from other devices on the network
    host: URL.domain.network,
    // print info when server starts listening for connections on the specified port
    onListening: () => {
      /* eslint-disable no-console */
      console.log('Network server:')
      logURL(networkURL)
      console.log(
        '(append `/webpack-dev-server` to the above URL to view the hierarchical tree of server files)',
      )
      console.log('') // print empty line
      /* eslint-enable no-console */
    },
    port: URL.port.network,
    // specify public to fix "invalid host header" error
    public: URL.domain.network,
  },
})
