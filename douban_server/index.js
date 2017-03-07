const express = require('express')
// const path = require('path')
const request = require('request')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
// cors跨域请求头设置
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next()
})
app.get('/', (req, res, next) => {
	res.send('返回了数据')
	next()
})
// 获取电影列表数据
app.get('/api/getMovieListData', (req, res, next) => {
	const message = JSON.parse(req.query.message)
	const url = `https://api.douban.com/v2/movie/${message.movieType}?start=${message.start}&count=${message.count}`
	request(url, (error, response, body) => {
		if(!error) {
			// console.log(body)
			res.send(body)
		}
	})
})
// 获取电影详细数据
app.get('/api/getMovieDetailData', (req, res, next) => {
	const id = req.query.message
	const url= `https://api.douban.com/v2/movie/subject/${id}`
	request(url, (error, response, body) => {
		if(!error) {
			res.send(body)
		}
	})
})
// 查询电影
app.get('/api/searchMovieListDate', (req, res, next) => {
	const message = JSON.parse(req.query.message)
	const keyword = encodeURI(message.keyword)
	const url = `https://api.douban.com/v2/movie/search?q=${keyword}`
	request(url, (error, response, body) => {
		if(!error) {
			res.send(body)
		}
	})
})

const server = app.listen(port,'127.0.0.1', () => {
	const host = server.address().address
	const port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})