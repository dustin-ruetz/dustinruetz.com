const {readFileSync} = require('fs')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

function createPage(route) {
  // https://webpack.js.org/plugins/html-webpack-plugin/
  const page = new htmlWebpackPlugin({
    filename:
      // enable routes with trailing slashes, i.e. domainname.com/pagename/
      route === 'home' ? 'index.html' : `${route}/index.html`,
    // do not inject all assets into the template (i.e. prevent pages from loading every script)
    inject: false,
    template: `./src/pages/${route}/${route}.pug`,
  })
  return page
}

const routes = ['contact', 'home']
const PORT = 4444

module.exports = {
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // enable gzip compression for everything served
    compress: true,
    // define certicate and key to use HTTPS in local development
    https: {
      cert: readFileSync('./ssl/public.cert'),
      key: readFileSync('./ssl/private.key'),
    },
    // suppress Webpack messages and bundle information (errors and warnings will still be shown)
    noInfo: true,
    // print info when server starts listening for connections on the specified port
    onListening: () => {
      /* eslint-disable no-console */
      console.log('Webpack configuration file: ./webpack.config.js')
      console.log('') // print an empty line
      console.log('Application available:')
      console.log(`https://development.dustinruetz.com:${PORT}`)
      /* eslint-enable no-console */
    },
    port: PORT,
    // specify host to fix "invalid host header" error
    public: 'development.dustinruetz.com',
  },
  // reduce the array of routes to create the Webpack entry points
  entry: routes.reduce((routesObject, route) => {
    routesObject[route] = `./src/pages/${route}/${route}.js`
    return routesObject
  }, {}),
  module: {
    rules: [
      // https://github.com/pugjs/pug-loader/
      {test: /\.pug$/, use: 'pug-loader'},
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/'),
  },
  plugins: routes.map((route) => createPage(route)),
}
