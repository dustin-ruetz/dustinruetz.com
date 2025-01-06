const {readdirSync, statSync} = require("fs");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * note that `getRoutes()` uses two synchronous Node.js filesystem methods: `readdirSync` and `statSync`
 *
 * while this means that the function blocks the main thread during execution, this isn't
 * a concern because it's only run locally via the Webpack build and development scripts
 *
 * originally I had `getRoutes()` using asynchronous fs methods, but the combination of
 * Webpack config files and webpack-merge did not work well with async code/promises.
 * @returns {[string]} - Array of routes representing the folders in the `src/pages/` directory.
 */
function getRoutes() {
	const pagesDirectory = path.resolve(__dirname, "../src/pages/");
	const pagesDirectoryItems = readdirSync(pagesDirectory);

	const routes = pagesDirectoryItems.filter((item) => {
		const itemPath = path.join(pagesDirectory, item);
		const itemIsDirectory = statSync(itemPath).isDirectory();
		return itemIsDirectory;
	});

	return routes;
}

function createPage(route) {
	// https://webpack.js.org/plugins/html-webpack-plugin/
	const page = new htmlWebpackPlugin({
		// set `chunks` and `inject` to insert the route-specific script and stylesheet in the <head>
		// (if `chunks` is not set then every route's CSS and JS bundle files will be injected)
		chunks: [route],
		inject: "head",
		// specify how and where HTML files should be outputted to enable routes with trailing slashes
		filename: () => {
			// prettier-ignore
			switch (route) {
        // 404 page must be placed in the root of the output directory with the '404.html'
        // filename in order to use the 'custom 404 page' feature of GitHub Pages
        case '404': return './404.html'
        case 'home': return './index.html'
        default: return `./${route}/index.html`
      }
		},
		// set the base path that will be prepended on all relative-path tag attributes
		// ex: <img src/>, <link href/>, <script src/>, etc.
		publicPath: "/",
		/**
		 * set `scriptLoading` to output <script defer/> tag attributes
		 * in order to avoid parser-blocking JavaScript code
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/#Attributes
		 * https://flaviocopes.com/javascript-async-defer/
		 */
		scriptLoading: "defer", // default = 'defer'
		template: `./src/pages/${route}/${route}.pug`,
	});
	return page;
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
const filenameTemplate = "[name]/[name].[contenthash]";

module.exports = {
	// reduce the array of routes to create the Webpack entry points object
	entry: getRoutes().reduce((routesObject, route) => {
		routesObject[route] = `./src/pages/${route}/${route}.js`;
		return routesObject;
	}, {}),
	module: {
		rules: [
			// images
			{
				test: /\.(jpg|png)$/,
				// https://webpack.js.org/guides/asset-modules/
				type: "asset/resource",
				generator: {
					filename: (pathData) => {
						const [filePathAndFileName, fileExtension] =
							pathData.filename.split(".");
						const assetType =
							filePathAndFileName.includes("/favicons/") && "favicons";

						// preserve directory/filename structure of images as much as possible
						// in order to output cleanly-mapped directory/file names on build
						let assetPathAndName;
						switch (assetType) {
							// favicons are used on all pages, so output them in their own dedicated directory
							case "favicons":
								assetPathAndName = filePathAndFileName.replace("src/", "");
								break;
							// output all other assets as nested within their respective page directories
							default:
								assetPathAndName = filePathAndFileName.replace(
									"src/pages/",
									"",
								);
								break;
						}

						// use the image's filepath/filename and contenthash as its URL filename
						// (useful for cache-busting when the contents of the file change)
						return `${assetPathAndName}.${pathData.contentHash}.${fileExtension}`;
					},
				},
			},
			// SVGs
			// https://webpack.js.org/guides/asset-modules/
			{
				test: /\.svg$/,
				type: "asset/source",
			},
			// styles
			// https://webpack.js.org/plugins/mini-css-extract-plugin/
			// https://webpack.js.org/loaders/css-loader/
			// https://webpack.js.org/loaders/sass-loader/
			{
				test: /\.scss$/,
				use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			// templates
			// https://github.com/pugjs/pug-loader/
			{test: /\.pug$/, use: "pug-loader"},
		],
	},
	optimization: {
		minimizer: [
			// specify `'...'` to ensure that the TerserPlugin is used to significantly reduce the file size of the compiled JavaScript bundles
			// paraphrased excerpt from https://webpack.js.org/configuration/optimization/#optimizationminimizer:
			// > By default, webpack configures `optimization.minimizer` to use `TerserPlugin`. This configuration
			// > can be accessed with `'...'` if you want to keep it when customizing this setting.
			"...",
			// https://github.com/webpack-contrib/image-minimizer-webpack-plugin/#optimize-with-sharp
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.sharpMinify,
					options: {
						encodeOptions: {
							jpeg: {
								quality: 90,
							},
							png: {
								// excerpt from https://sharp.pixelplumbing.com/api-output#png:
								// > CPU effort, between 1 (fastest) and 10 (slowest).
								effort: 10,
								quality: 90,
							},
						},
					},
				},
			}),
		],
	},
	output: {
		/**
		 * I had previously set `output.clean` here under the assumption that it would
		 * delete the directories/files that were no longer being required. While it
		 * did perform that task, it also had two adverse side effects:
		 *
		 * 1. In development it was causing the dev server to lose image require()s;
		 *    images would initially be outputted on the server but would then be
		 *    removed after modifying and saving files/reloading pages.
		 *
		 * 2. In production it was removing everything within the the root ./www/
		 *    output directory as a result of running the build script; this
		 *    caused the `build` GitHub Action to fail because there were no
		 *    files to commit to the Git branch/worktree.
		 *
		 * For these reasons I'm not including `output.clean` here; it doesn't have
		 * much impact in development, and in production the `build` GitHub Action
		 * already removes the ./www/ directory prior to running the build script.
		 */
		filename: `${filenameTemplate}.js`,
		path: path.resolve(__dirname, "../www/"),
	},
	plugins: [
		// take the resulting mapped array of routes and spread each item as its own plugin;
		// essentially this compiles to `createPage('route1'), createPage('route2'), (etc.)`
		...getRoutes().map((route) => createPage(route)),
		// https://webpack.js.org/plugins/copy-webpack-plugin/
		new copyWebpackPlugin({
			// copy the CNAME text file to the root of the output directory
			// to enable secure redirects when hosting with GitHub Pages
			patterns: [{from: "./src/config/CNAME", to: "../www/"}],
		}),
		// https://webpack.js.org/plugins/mini-css-extract-plugin/
		new miniCssExtractPlugin({
			filename: `${filenameTemplate}.css`,
		}),
	],
};
