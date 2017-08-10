/**
 * 项目部署配置文件
 */
var path = require('path')
var webpack = require('webpack')
// 抽取css第三方插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.jsx'), // 文件入口
    vendor: ['react', 'react-dom', 'react-router', 'react-loading', 'antd', 'react-addons-perf', 'react-addons-pure-render-mixin'] // 通过CommonsChunkPlugin抽取第三方库
  },
  output: {
    path: path.resolve(__dirname, './dist'), // 文件打包输出目录
    filename: 'js/[name].[chunkhash:8].js', // name对应入口的app, 打包为一个整体
    // 为了做代码的异步加载
    publicPath: '/',
    chunkFilename: '[name].[chunkhash:8].js' // name对应Routers.jsx中异步加载各个组件的名称
  },
  module: {
    rules: [
      // 处理jsx语法和ES6语法
      {
        test: /\.jsx?$/,
        loader: 'babel-loader', // 使用babel-loader加载js语法
        exclude: /node_modules/ // 必须排除掉node_modules的js文件, 否则报错
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true // 压缩抽取的css, 需要安装clean-css包
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 1kb=1024b 1b=8bit   25000bit~3kb
      // 如果图片小于25000b, 自动转化为base64格式图片文件, 减少网络请求服务器次数
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url?limit=25000&name=images/[name].[ext]'
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        loader: 'url?limit=50000&name=fonts/[name].[ext]'
      },
    ]
  },
  resolve: {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    // 注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
    extensions: ['.js', '.json', '.scss', '.jsx'],
    // 模块别名定义，方便后续直接引用别名，无须多写长长的地址。后续直接 require('AppStore') 即可
    // alias: {
    //    ReactJS:"node_modules/react/react.min.js",
    //    AppStore: 'js/stores/AppStores.js',
    // }
  },
  // 在这个属性里面定义的包是不会被打包进bundle.js文件中的,如果你要用这个属性,别忘了在index.html中引入cdn
  // externals: {
  //   // 配置了这个属性之后react和react-dom这些第三方的包都不会被构建进js中，那么我们就需要通过cdn进行文件的引用了
  //   // 前边这个名称是在项目中引用用的，相当于import React from 'react1'中的react，
  //   'react1':"react",
  //   'react-dom1':"react-dom",
  //   '$1':"jQuery"
  // },
  plugins: [
    // 构建之前先删除dist目录下面的文件夹
    new CleanPlugin(['./dist']),
    // 分离第三方应用插件,name属性会自动指向entry中vendor属性，filename属性中的文件会自动构建到output中的path属性下面
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name].[chunkhash:8].js'}),
    // 用webpack压缩代码，可以忽略代码中的警告
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 可以新建多个抽离样式的文件，这样就可以有多个css文件了。
    new ExtractTextPlugin("css/[name].[chunkhash:8].css"), // name对应入口的app
    // compiling our final assets
    new HtmlWebpackPlugin({
      template: './src/template.html', // html模板路径，HtmlWebpackPlugin自动引入css，js文件
      /*htmlWebpackPlugin: { // 打包后的html文件自动引用css, js文件
        "files": {
          "css": ["[name].[chunkhash:8].css"],
          "js": ["[name].[chunkhash:8].js","[name].[chunkhash:8].js"]
        }
      },*/
      // 效果不大，情怀至上
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true // 移除html属性的引号
      }
    }),
    new webpack.DefinePlugin({
      // 根据生产环境去掉react中的警告，react会自己判断，定义生产环境，编译React时压缩到最小
      'process.env': {
          NODE_ENV: '"production"'
      }
    }),
  ]
}
