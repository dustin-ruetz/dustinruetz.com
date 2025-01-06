// development configuration used for both dev-local and dev-network servers
module.exports = {
	// https://webpack.js.org/guides/development/
	mode: "development",
	// tip: navigate to `/webpack-dev-server/` on the host server to view its hierarchical tree of files
	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		// serve the '404 page not found' HTML file in the event of a 404 error
		historyApiFallback: {
			rewrites: [
				{
					from: /./,
					// refer to webpack.common.js `createPage` function for how this path is determined
					to: "/404.html",
				},
			],
		},
		// reload/refresh the page when file changes are detected; note that
		// hot must be disabled in order for liveReload to take effect
		hot: false,
		liveReload: true,
		// disable serving static files from default '/public/' directory
		static: false,
	},
	// specify devtool as 'eval-source-map' to yield the highest quality SourceMap files in development
	// https://webpack.js.org/configuration/devtool/#development
	devtool: "eval-source-map",
	// reduce logging output to only errors and warnings while running webpack-dev-server
	// https://webpack.js.org/configuration/stats/
	stats: "errors-warnings",
	// plugins: [
	//   // https://webpack.js.org/plugins/define-plugin/
	//   new webpack.DefinePlugin({
	//     'process.env.SITE_ENV': JSON.stringify('development'),
	//   }),
	// ],
};
