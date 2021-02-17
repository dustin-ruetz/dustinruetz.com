const {readFileSync} = require('fs')
const webpackMerge = require('webpack-merge').merge
const {getURL, URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDev = require('./webpack.dev.js')
const {logURL} = require('./utils/log-url.js')

const localURL = getURL('local')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDev, {
  devServer: {
    // define certicate and key to use HTTPS in local development
    https: {
      cert: readFileSync('./ssl/public.crt'),
      key: readFileSync('./ssl/private.key'),
    },
    // print info when server starts listening for connections on the specified port
    onListening: () => {
      /* eslint-disable no-console */
      console.log('Local server:')
      logURL(localURL)
      console.log(
        '(append `/webpack-dev-server` to the above URL to view the hierarchical tree of server files)',
      )
      console.log('') // print empty line
      /* eslint-enable no-console */
    },
    port: URL.port.local,
    // specify public to fix "invalid host header" error
    public: `${URL.subdomain.local}.${URL.domain.local}`,
  },
})
