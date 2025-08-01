const webpackMerge = require("webpack-merge").merge;

const webpackConfigCommon = require("./webpack.common.js");
const webpackConfigDevelopment = require("./webpack.development.js");

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		// Specify host as "local-ip" to try to resolve the local IPv4 address, if available;
		// if local IPv4 address is unavailable then try to resolve the local IPv6 address.
		// Note: Server will automatically find a free port to use.
		host: "local-ip",
		// Use a self-signed certificate to use HTTPS for network clients.
		server: "https",
	},
});
