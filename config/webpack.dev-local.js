const {readFileSync} = require('fs')
const webpackMerge = require('webpack-merge').merge
const {URL} = require('../src/config/url.js')
const webpackConfigCommon = require('./webpack.common.js')
const webpackConfigDevelopment = require('./webpack.development.js')

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
  devServer: {
    // specify local development host
    // note: port is determined automatically
    host: `${URL.subdomain.local}.${URL.domain.local}`,
    // define certicate and key to use HTTPS in local development
    https: {
      cert: readFileSync('./ssl/public.crt'),
      key: readFileSync('./ssl/private.key'),
    },
  },
})
