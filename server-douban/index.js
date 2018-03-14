const express = require('express')
const path = require('path')
const request = require('request')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

// 访问静态资源
app.use(express.static(__dirname + '/public'))
// body-parser解析post提交的数据为json对象
app.use(bodyParser.urlencoded({ extended: false }))
// 解析普通get提交的数据为json格式
app.use(bodyParser.json())
// cors跨域请求头设置
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next()
})
app.get('/', (req, res, next) => {
	res.send('返回了数据')
	// next()
})
// 获取北美票房榜
app.get('/api/getHomeMovieData', (req, res, next) => {
	const url = 'https://api.douban.com/v2/movie/us_box'
	request(url, (error, response, body) => {
		if (!error) {
			res.send(body)
		}
	})
})
// 获取电影列表数据
app.get('/api/getMovieListData', (req, res, next) => {
	const message = JSON.parse(req.query.message)
	console.log(message)
	const url = `https://api.douban.com/v2/movie/${message.movieType}?start=${message.start}&count=${message.count}`
	// const url = `https://api.douban.com/v2/movie/in_theaters?start=4&count=10`
	request(url, (error, response, body) => {
		if (!error) {
			// console.log(body)
			res.send(body)
		}
	})
})
// 获取电影详细数据
app.get('/api/getMovieDetailData', (req, res, next) => {
	const id = req.query.message
	const url = `https://api.douban.com/v2/movie/subject/${id}`
	request(url, (error, response, body) => {
		if (!error) {
			res.send(body)
		}
	})
})
// 查询电影
app.get('/api/searchMovieListData', (req, res, next) => {
	const message = JSON.parse(req.query.message)
	const keyword = encodeURI(message.keyword)
	const url = `https://api.douban.com/v2/movie/search?q=${keyword}`
	request(url, (error, response, body) => {
		if (!error) {
			res.send(body)
		}
	})
})
// 接收表单数据
app.post('/api/sendFeedback', (req, res, next) => {
	console.log('请求了sendFeedback方法')
	console.log(req.body)
	const message = JSON.parse(req.body.message)
	console.log(message)
	res.send({
		status: 'OK'
	})
})
// 解决浏览器链接跳转问题（不算服务器端渲染），需要访问node服务器的地址127.0.0.1:3000
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// 注意端口号占用问题
const server = app.listen(port, '127.0.0.1', () => {
	const host = server.address().address
	const port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})

// app.listen(port, function () {
//   console.log('Server is running at port 3001...')
// })