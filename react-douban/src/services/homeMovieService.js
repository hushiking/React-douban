import config from '../js/config.js'

export default {
    getHomeMovieData() {
        return new Promise((resolve, reject) => {
            const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/getHomeMovieData`
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
    }
}
