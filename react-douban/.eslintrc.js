module.exports = {
    root: true, // eslint找到这个标识后，不会再去父文件夹中找 eslint的配置文件
    parser: 'babel-eslint', // 使用 babel-eslint来作为 eslint的解析器
    parserOptions: { // 设置解析器选项
        sourceType: 'module' // 表明自己的代码是ECMAScript模块
    },
    extends: [
        'standard', // 继承 eslint-config-standard里面提供的lint规则
        'plugin:react/recommended' // 继承 eslint-config-react里面提供的lint规则
    ],
    // required to lint *.vue files
    plugins: [
        'html' // 使用的插件 eslint-plugin-html. 写配置文件的时候，可以省略 eslint-plugin-
    ],
    rules: {  // 0表示关闭检测，1表示警告，2表示禁止使用（报错）
        // 箭头函数括号规则(0表示关闭)
        'arrow-parens': 0,
        // 是否允许 generator函数
        'generator-star-spacing': 0,
        // 对象或数组元素结尾是否省略逗号
        'comma-dangle': ['error', 'only-multiline'],
        // 分号检测
        'semi': 0,
        // function括号前面是否有空格
        'space-before-function-paren': 0,
        // 注释开始是否有空格(tab/space)
        'spaced-comment': 0,
        // 未使用的变量
        'no-unused-vars': 1,
        // 忽略缩进问题
        'indent': 0
    },
    globals: { // 声明在代码中自定义的全局变量
        'CONFIG': true,
        __DEV__: true
    },
    env: {
        browser: true, // 定义预定义的全局变量,比如 browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        node: true
    }
}