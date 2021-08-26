const {readFileSync} = require('fs')
const webpackMerge = require('webpack-merge').merge
const {URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDevelopment = require('./webpack.development.js')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // specify local development host
    // note: server will automatically find a free port to use
    host: `${URL.subdomain.local}.${URL.domain.local}`,
    // define certicate and key to use HTTPS for local clients
    https: {
      cert: readFileSync('./ssl/public.crt'),
      key: readFileSync('./ssl/private.key'),
    },
  },
})
