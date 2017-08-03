var path = require('path')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
	context: __dirname + '/src', // 开发环境目录
	entry: {
		app: './index.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查
				include: /src/, // src文件夹下的文件需要被lint
				use: [{
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter')
					}
				}]
				// exclude: /node_modules/ 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader',
					'eslint-loader'
				]
			},
			
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(eot|woff|ttf|woff2|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
	]
}