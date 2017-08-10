var path = require('path')
var webpack = require('webpack')
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
						formatter: require('eslint-friendly-formatter') // 编译后错误报告格式
					}
				}]
				// exclude: /node_modules/ 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_components
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
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader?limit=25000'
			},
			{
				test: /\.(eot|woff|ttf|woff2|svg)$/,
				loader: 'url-loader?limit=50000'
			}
		]
	},
	plugins: [
		// 打包完成自动打开浏览器
		new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'}),
		// 可在业务js代码中使用__DEV__判断是否是dev模式（dev模式下可以提示错误、测试报告等，production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
	]
}