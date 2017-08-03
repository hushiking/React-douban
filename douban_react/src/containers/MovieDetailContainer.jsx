import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading.jsx'
import service from '../services/movieListData.js'

import '../styles/movieDetail.css'

export default class MovieDetailContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 是否显示加载效果
      isLoading: true,
      // 电影详细数据
      movieDetailData: []
    }
  }
  static propTypes = {
    params: PropTypes.object
  }
  // static contextTypes = {
  //   router: PropTypes.object
  // }
  componentDidMount() {
    // 在组件内利用context特性使用代码跳转
    // setTimeout(() => {
    //   this.context.router.push('/home')
    // }, 3000)
    // service.getMovieListData()
    this.fetch(this.props.params.id)
  }
  // 请求数据的方法
  fetch = (id) => {
    const promise = service.getMovieDetailData(id)
    promise.then(
      data => {
        console.log(data)
        this.setState({
          isLoading: false,
          movieDetailData: data,
        })
      }
    ).catch(err => {
      console.error(err)
    })
  }
  // 渲染等待效果
  renderLoading = () => {
    return (
      <div className="movieDetail_container">
        <Loading/>
      </div>
    )
  }
  // 渲染电影详细数据
  renderMovieDetail = () => {
    return (
      <div className="movieDetail_container">
        <div className="movieDetail_image">
          <img src={this.state.movieDetailData.images.large} alt=""/>
        </div>
        <h1>{this.state.movieDetailData.title}</h1>
        <p>{this.state.movieDetailData.year}</p>
        <p>{this.state.movieDetailData.summary}</p>
      </div>
    )
  }
  render() {
    if (this.state.isLoading) {
      return this.renderLoading()
    }
    return this.renderMovieDetail()
  }
}
