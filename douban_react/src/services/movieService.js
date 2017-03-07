// import {hashHistory} from 'react-router'
import config from '../js/config.js'

export default {
	getMovieListData(message) {
		/*setTimeout(() => {
			hashHistory.push('/home')
		}, 3000)*/
		return new Promise((resolve, reject) => {
			// 如果要传递多个参数,那么这个message就是对象的字符串,如果只有一个参数,那么这个message就是这个参数本身
			const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/getMovieListData?message=${message}`
			// console.log(8)
			// setTimeout(() => {
			// 	console.log(9)
			// 	reject(111)
			// 	console.log(99)
			// }, 3000)
			// console.log(10)
			fetch(url)
				.then(response => {
					if(response.ok) {
						return response.json()
					} else {
						console.error(`服务器忙,请稍后再试;\r\nCode:${response.status}`)
					}
				})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})	
		})
	},
	getMovieDetailData(message) {
		return new Promise((resolve, reject) => {
			const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/getMovieDetailData?message=${message}`
			fetch(url)
				.then(response => {
					if(response.ok) {
						return response.json()
					} else {
						console.error(`服务器忙,请稍后再试;\r\Code:${response.status}`)
					}
				})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	searchMovieListData(message) {
		return new Promise((resolve, reject) => {
			const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/searchMovieListDate?message=${message}`
			fetch(url)
				.then(response => {
					if(response.ok) {
						return response.json()
					} else {
						console.error(`服务器忙,请稍后再试;\r\Code:${response.status}`)
					}
				})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}