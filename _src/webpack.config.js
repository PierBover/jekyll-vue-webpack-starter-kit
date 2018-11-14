const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';

function cleanOldBuilds () {
	rimraf.sync(path.resolve(__dirname, '../js'));
	rimraf.sync(path.resolve(__dirname, '../css/webpack/'));
}

class JekyllPlugin {
	apply(compiler) {
		compiler.hooks.done.tap('jekyll webpack.yml', (stats) => {
			const content = 'hash: ' + stats.hash;
			fs.writeFileSync(path.join(__dirname, '../_data', 'webpack.yml'), content);
		});

		compiler.hooks.beforeRun.tap('clean builds', cleanOldBuilds);
		compiler.hooks.watchRun.tap('clean builds watch', cleanOldBuilds);
	}
}

const entry = {};
const jsFilesFolder = path.resolve(__dirname, './pages/');
const jsFiles = fs.readdirSync(jsFilesFolder);

jsFiles.forEach((filename) => {
	if (filename.split('.')[1] === 'js') entry[filename.split('.')[0]] = path.join(jsFilesFolder, filename);
});

module.exports = {
	watch: DEV_MODE,
	mode: process.env.NODE_ENV,
	entry,
	output: {
		path: path.resolve(__dirname, '../js'),
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader'
					}
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
							includePaths: [path.resolve(__dirname,'node_modules')],
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'assets/[hash].[ext]'
						}
					}
				]
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new JekyllPlugin(),
		new MiniCssExtractPlugin({
			chunkFilename: '../css/webpack/[hash].css'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					filename: 'commons.[hash].js',
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	}
};