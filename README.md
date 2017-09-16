# React App of douban

本应用主要采用 `react` 框架, 通过 `webpack2` 整合打包, 开发豆瓣电影查询功能。

此外， `webpack2` 使用 `babel` 转换 `ES6` 代码, 使用 `eslint` 对 `js` 代码进行规范性检查。

## The Server of douban

其中 `server-douban` 目录是通过 `node.js` 的 `express` 框架手动搭建代理服务器实现跨域请求豆瓣电影的 `API` 接口。

**注意：** 在运行 `react-douban` 源代码之前先要打开 `server-douban` 服务器，否则无法请求数据接口。可以在 `server-douban` 目录使用 `node index.js` 打开代理服务器。

## The React App of douban

1. `react-douban` 目录包含 `src` 源文件和其他一些配置文件。
1. `.babelrc` 为 `babel` 配置文件。
1. `.eslintignore` 为 `eslint` 检查代码时忽略的文件。
1. `.eslintrc.js` 为 `eslint` 检查代码时的配置文件。
1. `webpack.config.js` 为应用开发阶段的配置文件, 使用 `npm start` 运行代码, 然后自动打开 Chrome 浏览器运行。
1. `webpack.production.js` 为应用发布阶段的配置文件, 使用`npm run build`构建代码, 然后在服务器下运行。