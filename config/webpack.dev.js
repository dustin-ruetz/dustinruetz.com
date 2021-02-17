// development configuration used for both dev-local and dev-network servers
module.exports = {
  // https://webpack.js.org/guides/development/
  mode: 'development',
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // enable gzip compression for everything served
    compress: true,
    // serve the '404 page not found' HTML file in the event of a 404 error
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          // refer to webpack.common.js `createPage` function for how this path is determined
          to: '/404.html',
        },
      ],
    },
    // reload the page when file changes are detected (`devServer.hot` option must be disabled)
    liveReload: true,
    // suppress Webpack messages and bundle information (errors and warnings will still be shown)
    noInfo: true,
  },
  // https://webpack.js.org/guides/development/#using-source-maps
  devtool: 'inline-source-map',
  // plugins: [
  //   // https://webpack.js.org/plugins/define-plugin/
  //   new webpack.DefinePlugin({
  //     'process.env.SITE_ENV': JSON.stringify('development'),
  //   }),
  // ],
}
