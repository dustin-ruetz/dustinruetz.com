// adapted from Bud Damyanov's answer on Stack Overflow
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color/#41407246
function logWarning(warning) {
	const colorYellow = "\x1b[33m"; // i.e. the foreground/text color
	const colorReset = "\x1b[0m"; // i.e. only apply text color change to the current log statement

	// eslint-disable-next-line no-console
	return console.warn(`${colorYellow}%s${colorReset}`, `Warning: ${warning}`);
}

module.exports = {logWarning};
