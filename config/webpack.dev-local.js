const {readFileSync} = require('fs')
const webpackMerge = require('webpack-merge').merge
const {getURL, URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDev = require('./webpack-config-dev.js')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDev, {
  devServer: {
    // define certicate and key to use HTTPS in local development
    https: {
      cert: readFileSync('./ssl/public.crt'),
      key: readFileSync('./ssl/private.key'),
    },
    onListening: () => {
      /* eslint-disable no-console */
      console.log('  ./config/webpack.dev-local.js')
      console.log('') // print empty line
      console.log('Local server:')
      console.log(`  ${getURL('local')}`)
      console.log('') // print empty line
      /* eslint-enable no-console */
    },
    port: URL.port.local,
    // specify public to fix "invalid host header" error
    public: `${URL.subdomain.local}.${URL.domain.local}`,
  },
})
