# React App of douban
本应用主要采用 react 框架, 通过 webpack2 整合打包, 开发豆瓣电影查询功能

webpack2 使用 babel 转换 ES6 代码, 使用 eslint 对 js 代码进行规范性检查
## The Server of douban
其中 douban_server 文件夹是通过 node.js 的 express 手动搭建代理服务器实现跨域请求豆瓣电影API
## The React App of douban
douban_react 文件夹包含 src 源文件和其他一些配置文件

其中, .babelrc 为 babel 配置文件
.eslintignore 为 eslint 检查代码时忽略的部分文件
.eslintrc.js 为 eslint 检查代码时的配置文件

另外, webpack.develop.js 为应用开发阶段的配置文件, 使用`npm run dev`运行代码, 然后自动打开 Chrome 浏览器运行.

webpack.publish.js 为应用发布阶段的配置文件, 使用`npm run build`构建代码, 然后在服务器下运行.