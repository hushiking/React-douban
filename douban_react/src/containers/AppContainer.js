/*根容器组件*/
import React, {Component} from 'react'

import {Link} from 'react-router'
import '../styles/app.css'

export default class AppContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<div className='app'>
				<div className='app_header'>
					<Link to='/home'>首页</Link>
					<Link to='/movie'>电影页面</Link>
					<Link to='/about'>联系我们</Link>
					{/*<br/>
					<Link to='/movie/movieList'>列表</Link>
					<Link to='/movie/movieDetail'>详细</Link>
					<Link to='/movie/movieSearch'>查询</Link>
					<br/>
					<Link to='/movieList'>新列表</Link>
					<Link to='/movieDetail'>新详细</Link>
					<Link to='/movieSearch'>新查询</Link>*/}
				</div>
				<div className='app_content'>
					{/*这是根容器组件*/}
					{/*这个就是路由挖的坑*/}
					{this.props.children}
				</div>
				<div className='app_footer'>
					版权所有@黑马三期
				</div>
			</div>
			)
	}
}