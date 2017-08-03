import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading.jsx'
import service from '../services/movieListData.js'

import '../styles/movieList.css'

export default class MovieListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 是否显示加载效果
      isLoading: true,
      // 是否到底了
      isBottom: false,
      // 电影列表数据
      movieListData: [],
      // 向服务器发送的数据都写在message对象中
      messages: {
        movieType: 'in_theaters',
        count: 10,
        start: 0,
        pageIndex: 1
      }
    }
  }
  static propTypes = {
    params: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    /* setTimeout(() => {
      this.setState({
        isLoading: false,
        movieListData: []
      })
    }, 2000) */
    console.log(1)
    this.fetch(this.state.messages.movieType)
  }
  componentWillReceiveProps(nextProps) {
    console.log(2)
    this.fetch(nextProps.params.movieType)
  }
  componentDidUpdate(prevProps, prevState) {
    // 根据isLoading判断movieType类型是否发生改变, 然后重新发送url请求
    if (this.state.isLoading) {
      console.log(3)
      this.fetch(this.state.messages.movieType)
    } else {
      console.log(4)
      // 将电影列表绑定的onscroll事件清空, 以便再次绑定, 否则会重复绑定
      this.theDiv.onscroll = null
      this.addEventListener()
    }
  }
  // 为滚动的容器添加滚动监听事件
  addEventListener = () => {
    this.theDiv.onscroll = e => {
      if (e.target.scrollHeight === e.target.scrollTop + e.target.offsetHeight) {
        console.log(5)
        if (this.state.isBottom) {
          return
        }
        this.fetch(this.state.messages.movieType)
        this.setState({
          isBottom: true
        })
      }
    }
  }
  // 请求数据的方法
  fetch = (movieType) => {
    // 如果电影类型发生改变, 重新设置state
    if (this.state.messages.movieType !== movieType) {
      console.log(6)
      // 电影类型改变后, 重新设置movieList_container的滚轮高度, 并清空绑定事件
      this.theDiv.scrollTop = 0
      this.theDiv.onscroll = null
      this.setState({
        // 是否显示加载效果
        isLoading: true,
        // 是否到底了
        isBottom: false,
        // 电影列表数据
        movieListData: [],
        // 向服务器发送的数据都写在message对象中
        messages: {
          movieType: movieType,
          count: 10,
          start: 0,
          pageIndex: 1
        }
      })
      return
    }
    console.log(7)
    // ES6深拷贝对象
    let messages = Object.assign({}, this.state.messages)
    let movieListData = [].concat(this.state.movieListData)
    // 修改分页信息
    messages.movieType = movieType
    messages.start = (messages.pageIndex - 1) * messages.count
    messages.pageIndex++

    // 将messages对象转化json字符串格式方便传递参数
    const message = JSON.stringify(messages)
    const promise = service.getMovieListData(message)
    promise.then(
      data => {
        console.log(data)
        // 如果movieListData中已经有数据, 则进一步追加数据
        if (movieListData.length > 0) {
          movieListData = movieListData.concat(data.subjects)
        } else {
          movieListData = data.subjects
        }
        // 接收到返回的数据后, 修改state状态
        this.setState({
          isLoading: false,
          isBottom: false,
          movieListData: movieListData,
          messages: messages
        })
      }
    ).catch(err => {
      console.error(err)
    })
  }
  // 跳转到电影详细页面
  goDetail = (id) => {
    this.context.router.push(`/movieDetail/${id}`)
  }
  // 渲染loading效果
  renderLoading = () => {
    return (
      <div className="movieList_container">
        <Loading/>
      </div>
    )
  }
  // 电影列表的每个项
  renderItem = (item) => {
    return (
      <div className="movieList_item" key={item.id} onClick={() => this.goDetail(item.id)}>
        <img src={item.images.small} alt=""/>
        <div>
          <h1>{item.title}</h1>
          <span>{item.year}</span>
        </div>
      </div>
    )
  }
  // 循环渲染电影列表数据
  renderMovieList = () => {
    return (
      <div ref={div => (this.theDiv = div)} className="movieList_container">
        {this.state.movieListData.map(this.renderItem)}
        <div className={this.state.isBottom ? 'movieList_show' : 'movieList_hide'}>正在玩命加载中, 请稍候......</div>
      </div>
    )
  }
  // 渲染数据
  render() {
    if (this.state.isLoading) {
      return this.renderLoading()
    }
    return this.renderMovieList()
  }
}
