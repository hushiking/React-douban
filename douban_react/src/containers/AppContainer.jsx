import React from 'react'
import {Link} from 'react-router'
import PropTypes from 'prop-types'

import '../styles/app.css'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  static propTypes = {
    children: PropTypes.object
  }
  render() {
    return (
      <div className="app">
        <div className="app_header">
          <Link to='/home'>首页</Link>
          <Link to='/movie'>电影页面</Link>
          <Link to='/about'>联系我们</Link>
        </div>
        {/* <br/>
        <Link to='/movie/movieList'>列表</Link>
        <Link to='/movie/movieDetail'>详细</Link>
        <Link to='/movie/movieSearch'>查询</Link>
        <br/>
        <Link to='/movieList'>新列表</Link>
        <Link to='/movieDetail/1234'>新详细</Link>
        <Link to='/movieSearch'>新查询</Link> */}
        <div className="app_content">
          {/* 路由匹配的内容 */}
          {this.props.children}
        </div>
        <div className="app_footer">版权@红心K丶釒</div>
      </div>
    )
  }
}
