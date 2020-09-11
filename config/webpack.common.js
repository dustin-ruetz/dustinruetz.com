const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const {DOMAIN} = require('../src/config/constants.js')

function createPage(route) {
  // https://webpack.js.org/plugins/html-webpack-plugin/
  const page = new htmlWebpackPlugin({
    // specify how and where HTML files should be outputted
    // to enable routes with trailing slashes
    filename: route === 'home' ? './index.html' : `./${route}/index.html`,
    // do not inject all assets into the template (i.e. prevent pages from loading every script)
    inject: false,
    template: `./src/pages/${route}/${route}.pug`,
  })
  return page
}

const routes = ['404', 'home']

module.exports = {
  // reduce the array of routes to create the Webpack entry points
  entry: routes.reduce((routesObject, route) => {
    routesObject[route] = `./src/pages/${route}/${route}.js`
    return routesObject
  }, {}),
  module: {
    rules: [
      // images
      // https://webpack.js.org/loaders/file-loader/
      // https://github.com/tcoopman/image-webpack-loader/
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: (resourcePath) => {
                // use the domain constant to split the path; this assumes that
                // directory/repo name === domain name
                const assetRelativePath = resourcePath.split(DOMAIN)[1]

                const assetType =
                  assetRelativePath.includes('/favicons/') && 'favicons'

                // preserve directory/filename structure of assets as much as possible
                // in order to output cleanly mapped directory/file names on build
                switch (assetType) {
                  case 'favicons':
                    return assetRelativePath.replace('/src/', './')
                  // output all other assets as nested within their respective page directories
                  default:
                    return assetRelativePath.replace('/src/pages/', './')
                }
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            /**
             * the image-webpack-loader docs recommend setting `options.disable = true` while
             * working in your development environment in order to speed up compilations
             *
             * I've chosen to keep image compression enabled in development in order to maintain more similarity
             * between my development and production environments; keeping it enabled also gives me
             * more accurate information in the browser on metrics like file size and loading time
             */
          },
        ],
      },
      // SVGs
      // https://webpack.js.org/loaders/svg-inline-loader/
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      // styles
      // https://webpack.js.org/plugins/mini-css-extract-plugin/
      // https://webpack.js.org/loaders/css-loader/
      // https://webpack.js.org/loaders/sass-loader/
      {
        test: /\.scss$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // templates
      // https://github.com/pugjs/pug-loader/
      {test: /\.pug$/, use: 'pug-loader'},
    ],
  },
  output: {
    // specify how and where JS bundle files should be outputted
    // and name them the same as the route for easier debugging
    filename: './[name]/[name].js',
    path: path.resolve(__dirname, '../www/'),
  },
  plugins: [
    ...routes.map((route) => createPage(route)),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new copyWebpackPlugin({
      // copy the CNAME text file to the root of the output directory
      // to enable secure redirects when hosting with GitHub Pages
      patterns: [{from: './src/config/CNAME', to: '../www/'}],
    }),
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new miniCssExtractPlugin({
      // specify how and where CSS bundle files should be outputted
      // and name them the same as the route for easier debugging
      filename: './[name]/[name].css',
    }),
  ],
}
