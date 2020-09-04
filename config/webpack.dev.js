const {readFileSync} = require('fs')
const webpackMerge = require('webpack-merge').merge
const webpackConfigCommon = require('./webpack.common.js')

// eslint-disable-next-line no-console
const logEmptyLine = () => console.log('')

const PORT = 4444

module.exports = webpackMerge(webpackConfigCommon, {
  // https://webpack.js.org/guides/development/
  mode: 'development',
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // enable gzip compression for everything served
    compress: true,
    // define certicate and key to use HTTPS in local development
    https: {
      cert: readFileSync('./ssl/public.cert'),
      key: readFileSync('./ssl/private.key'),
    },
    // reload the page when file changes are detected (`devServer.hot` option must be disabled)
    liveReload: true,
    // suppress Webpack messages and bundle information (errors and warnings will still be shown)
    noInfo: true,
    // print info when server starts listening for connections on the specified port
    onListening: () => {
      /* eslint-disable no-console */
      logEmptyLine()
      console.log('Webpack configuration files:')
      console.log('  ./config/webpack.common.js')
      console.log('  ./config/webpack.dev.js')
      logEmptyLine()
      console.log('Application available:')
      console.log(`https://development.dustinruetz.com:${PORT}`)
      logEmptyLine()
      /* eslint-enable no-console */
    },
    port: PORT,
    // specify host to fix "invalid host header" error
    public: 'development.dustinruetz.com',
  },
  // https://webpack.js.org/guides/development/#using-source-maps
  devtool: 'inline-source-map',
})
