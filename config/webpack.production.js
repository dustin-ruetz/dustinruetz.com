const webpackMerge = require("webpack-merge").merge;
const webpackConfigCommon = require("./webpack.common.js");

module.exports = webpackMerge(webpackConfigCommon, {
	// https://webpack.js.org/guides/production/
	mode: "production",
	// specify devtool as 'nosources-source-map' to map stack traces on the client without exposing
	// the source code via sourcesContent; SourceMap files can be safely deployed on the webserver
	// https://webpack.js.org/configuration/devtool/#production
	devtool: "nosources-source-map",
});
