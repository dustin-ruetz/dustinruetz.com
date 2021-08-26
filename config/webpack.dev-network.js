const webpackMerge = require('webpack-merge').merge
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDevelopment = require('./webpack.development.js')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
  devServer: {
    // specify host as 'local-ip' to try and resolve the local IPv4 address
    // note: port is determined automatically
    host: 'local-ip',
    // use a self-signed certificate to use HTTPS for network clients
    https: true,
  },
})
