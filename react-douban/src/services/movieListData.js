import config from '../js/config.js'

export default {
    // 获取电影列表数据
    getMovieListData(message) {
        // console.log(7)
        console.log(message)
        // 返回一个Promise对象
        return new Promise((resolve, reject) => {
            // 如果有多个参数, message是对象字符串, 否则message就是参数本身
            const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/getMovieListData?message=${message}`
            console.log(url)
            /*console.log(8)
            setTimeout(() => {
              console.log(9)
              reject(new Error('something bad happened'))
            }, 2000)
            console.log(10)*/
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error(`服务器忙,请稍后再试;\r\nCode:${response.status}`)
                    }
                })
                .then(data => {
                    console.log(data)
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // 获取电影详细数据
    getMovieDetailData(message) {
        return new Promise((resolve, reject) => {
            const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/getMovieDetailData?message=${message}`
            fetch(url)
                .then(response => {
                    if (response.ok) {
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
    // 获取电影搜索数据
    searchMovieListData(message) {
        return new Promise((resolve, reject) => {
            const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/searchMovieListData?message=${message}`
            fetch(url)
                .then(response => { // promise第一步返回response
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error(`服务器忙,请稍后再试;\r\nCode:${response.status}`)
                    }
                })
                .then(data => { // 第二步通过resolve传递数据到MovieListContainer组件中
                    console.log(data)
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
}
