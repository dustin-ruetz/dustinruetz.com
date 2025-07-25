const webpackMerge = require("webpack-merge").merge;

const {url} = require("../src/config/url.js");

const webpackConfigCommon = require("./webpack.common.js");
const webpackConfigDevelopment = require("./webpack.development.js");

module.exports = webpackMerge(webpackConfigCommon, webpackConfigDevelopment, {
	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		// Specify local development host.
		// Note: Server will automatically find a free port to use.
		host: `${url.subdomain.local}.${url.domain.local}`,
		server: {
			type: "https",
			options: {
				// Define certificate and key to use HTTPS for local clients.
				cert: "./tls/public.cert",
				key: "./tls/private.key",
			},
		},
	},
});
