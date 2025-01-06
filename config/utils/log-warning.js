/**
 * @param {string} warning - The warning text to log out.
 */
function logWarning(warning) {
	// Colorizing the console output adapted from Bud Damyanov's 2016-Dec-31 answer on Stack Overflow.
	// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color/#41407246

	/** The foreground/text color. */
	const colorYellow = "\x1b[33m";
	/** Reset in order to only apply text color change to the current log statement. */
	const colorReset = "\x1b[0m";

	// eslint-disable-next-line no-console
	console.warn(`${colorYellow}%s${colorReset}`, `Warning: ${warning}`);
}

module.exports = {logWarning};
