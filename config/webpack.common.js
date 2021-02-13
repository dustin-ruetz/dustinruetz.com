const {readdirSync, statSync} = require('fs')
const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const {DOMAIN} = require('../src/config/constants.js')

/**
 * note that `getRoutes()` uses two synchronous Node.js filesystem methods: `readdirSync` and `statSync`
 *
 * while this means that the function blocks the main thread during execution, this isn't
 * a concern because it's only run locally via the Webpack build and development scripts
 *
 * originally I had `getRoutes()` using asynchronous fs methods, but the combination of
 * Webpack config files and webpack-merge did not work well with async code/promises
 */
function getRoutes() {
  const pagesDirectory = path.resolve(__dirname, '../src/pages/')
  const pagesDirectoryItems = readdirSync(pagesDirectory)

  const routes = pagesDirectoryItems.filter((item) => {
    const itemPath = path.join(pagesDirectory, item)
    const itemIsDirectory = statSync(itemPath).isDirectory()
    return itemIsDirectory
  })

  return routes
}

function createPage(route) {
  // https://webpack.js.org/plugins/html-webpack-plugin/
  const page = new htmlWebpackPlugin({
    // set `chunks` and `inject` to insert the route-specific script and stylesheet in the <head>
    // (if `chunks` is not set then every route's CSS and JS bundle files will be injected)
    chunks: [route],
    inject: 'head',
    // specify how and where HTML files should be outputted to enable routes with trailing slashes
    filename: route === 'home' ? './index.html' : `./${route}/index.html`,
    // set the base path that will be prepended to <link href/> and <script src/> tag attributes
    publicPath: '/',
    /**
     * set `scriptLoading` to output <script defer/> tag attributes
     * in order to avoid parser-blocking JavaScript code
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/#Attributes
     * https://flaviocopes.com/javascript-async-defer/
     */
    scriptLoading: 'defer', // default = 'defer'
    template: `./src/pages/${route}/${route}.pug`,
  })
  return page
}

/**
 * specify how and where CSS and JS bundle files should be outputted
 *
 * 1. use the entrypoint/route-specific JS filename (ex: about.js, home.js, etc.)
 *    to set both the filepath and the first part of the filename
 * 2. use the file's contenthash to set the second part of the filename
 *    (useful for cache-busting when the contents of the file change)
 *
 * https://webpack.js.org/configuration/output/#template-strings
 */
const filenameTemplate = '[name]/[name].[contenthash]'

module.exports = {
  // reduce the array of routes to create the Webpack entry points object
  entry: getRoutes().reduce((routesObject, route) => {
    routesObject[route] = `./src/pages/${route}/${route}.js`
    return routesObject
  }, {}),
  module: {
    rules: [
      // images
      // https://webpack.js.org/loaders/file-loader/
      // https://github.com/tcoopman/image-webpack-loader/
      {
        test: /\.(jpg|png)$/,
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
    filename: `${filenameTemplate}.js`,
    path: path.resolve(__dirname, '../www/'),
  },
  plugins: [
    // take the resulting mapped array of routes and spread each item as its own plugin;
    // essentially this compiles to `createPage('route1'), createPage('route2'), (etc.)`
    ...getRoutes().map((route) => createPage(route)),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new copyWebpackPlugin({
      // copy the CNAME text file to the root of the output directory
      // to enable secure redirects when hosting with GitHub Pages
      patterns: [{from: './src/config/CNAME', to: '../www/'}],
    }),
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new miniCssExtractPlugin({
      filename: `${filenameTemplate}.css`,
    }),
  ],
}
