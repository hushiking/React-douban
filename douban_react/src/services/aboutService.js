import config from '../js/config.js'

export default {
  // fetch的采用post提交发送反馈意见
  sendFeedback(message) {
    return new Promise((resolve, reject) => {
      console.log(message)
      const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/api/sendFeedback`
      console.log(url)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `message=${message}`
      })
        .then(response => { // promise第一步返回response
          if (response.ok) {
            return response.json()
          } else {
            console.error(`服务器忙,请稍后再试;\r\nCode:${response.status}`)
          }
        })
        .then(data => { // 第二步通过resolve传递数据到AboutContainer组件中
          console.log(data)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
