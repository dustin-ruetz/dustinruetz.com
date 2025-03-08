const os = require("os");
const {logWarning} = require("../../config/utils/log-warning.js");
const {DOMAIN} = require("./constants.js");

const isIPv4config = (ipConfig) => ipConfig.family === "IPv4";

const localIPconfig = (() => {
	switch (os.type()) {
		case "Darwin":
			return os.networkInterfaces().en0.find(isIPv4config);
		case "Windows_NT":
			return os.networkInterfaces()["Wi-Fi"].find(isIPv4config);
		default:
			logWarning(
				"os.networkInterfaces() has only been tested on " +
					`"Darwin" (i.e. macOS) and "Windows_NT" platforms.`,
			);
			throw new Error(
				`Expected os.type() to be "Darwin" or "Windows_NT"; received "${os.type()}".`,
			);
	}
})();

const URL = {
	protocol: {
		local: "https",
		network: "http",
		production: "https",
	},
	subdomain: {
		local: "development",
		network: null,
		production: "www",
	},
	domain: {
		local: DOMAIN,
		network: localIPconfig.address,
		production: DOMAIN,
	},
	port: {
		local: 4444,
		network: 5555,
		production: null,
	},
};

/**
 * @param {string} environment - The environment that the site is being run in.
 * @returns {string} - The site's URL.
 * @throws - An error if the passed `environment` argument is invalid.
 */
function getURL(environment) {
	switch (environment) {
		case "local":
			return `${URL.protocol.local}://${URL.subdomain.local}.${URL.domain.local}:${URL.port.local}`;
		case "network":
			return `${URL.protocol.network}://${URL.domain.network}:${URL.port.network}`;
		case "production":
			return `${URL.protocol.production}://${URL.subdomain.production}.${URL.domain.production}`;
		default: {
			const invalidEnvironmentArg =
				typeof environment === "string" ? `"${environment}"` : environment;
			const validEnvironmentArgs = ["local", "network", "production"];
			throw new Error(
				`getURL(environment) requires one of [${validEnvironmentArgs}] as an argument; received ${invalidEnvironmentArg}.`,
			);
		}
	}
}

module.exports = {getURL, URL};
