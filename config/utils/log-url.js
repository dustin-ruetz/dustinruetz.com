/**
 * @param {string} url - The URL to log out.
 */
function logURL(url) {
	// Colorizing the console output adapted from Bud Damyanov's 2016-Dec-31 answer on Stack Overflow.
	// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color/#41407246

	/** The foreground/text color. */
	const colorBlue = "\x1b[34m";
	/** Reset in order to only apply text color change to the current log statement. */
	const colorReset = "\x1b[0m";

	// eslint-disable-next-line no-console
	console.log(`${colorBlue}%s${colorReset}`, url);
}

module.exports = {logURL};
