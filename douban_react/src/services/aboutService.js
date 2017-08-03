import config from '../js/config.js'

export default {
  // 发送反馈意见
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
