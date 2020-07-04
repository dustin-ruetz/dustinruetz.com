const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')
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

module.exports = {
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
    path: path.resolve(__dirname, '../www/'),
  },
  plugins: [
    ...routes.map((route) => createPage(route)),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new copyWebpackPlugin({
      patterns: [{from: './src/config/CNAME', to: '../www/'}],
    }),
  ],
}
