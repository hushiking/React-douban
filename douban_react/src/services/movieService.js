import {hashHistory} from 'react-router'

// 在组件外使用hashHistory跳转路由
export default {
  getMovieListData() {
    setTimeout(function() {
      hashHistory.push('/home')
    }, 3000)
  }
}
