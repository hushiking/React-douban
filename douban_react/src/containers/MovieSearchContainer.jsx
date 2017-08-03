import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading.jsx'
import service from '../services/movieListData.js'

import '../styles/movieList.css'

export default class MovieSearchContainer extends React.Component {
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
        keyword: this.props.params.keyword,
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
    this.fetch(this.state.messages.keyword)
  }
  componentWillReceiveProps(nextProps) {
    this.fetch(nextProps.params.keyword)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading) {
      this.fetch(this.state.messages.keyword)
    } else {
      this.theDiv.onscroll = null
      this.addEventListener()
    }
  }
  // 为滚动的容器添加滚动监听事件
  addEventListener = () => {
    this.theDiv.onscroll = e => {
      if (e.target.scrollHeight === e.target.scrollTop + e.target.offsetHeight) {
        if (this.state.isBottom) {
          return
        }
        this.fetch(this.state.messages.keyword)
        this.setState({
          isBottom: true
        })
      }
    }
  }
  // 请求数据的方法
  fetch = (keyword) => {
    // 判断搜索的电影是否存在
    if (this.state.messages.keyword !== keyword) {
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
          keyword: keyword,
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
    messages.keyword = keyword
    messages.start = (messages.pageIndex - 1) * messages.count
    messages.pageIndex++

    // 将messages对象转化json字符串格式方便传递参数
    const message = JSON.stringify(messages)
    const promise = service.searchMovieListData(message)
    promise.then(
      data => {
        console.log(data)
        if (movieListData.length > 0) {
          movieListData = movieListData.concat(data.subjects)
        } else {
          movieListData = data.subjects
        }
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
  // 渲染电影列表每一项, key值与MovieList页面重复报错, 所有添加Math.random()
  renderItem = (item) => {
    return (
      <div className="movieList_item" key={item.id + Math.random()} onClick={() => this.goDetail(item.id)}>
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
  render() {
    if (this.state.isLoading) {
      return this.renderLoading()
    }
    return this.renderMovieList()
  }
}
