/*电影容器组件*/
import React, {Component} from 'react'

import service from '../services/movieService.js'
import '../styles/movieList.css'

export default class MovieListContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// 是否显示加载效果
			isLoading: true,
			// 是否到底了
			isBottom: false,
			// 电影列表数据
			movieListData: [],
			// 只要是往服务器发送的数据都放在messages对象中
			messages: {
				movieType: 'in_theaters',
				count: 10,
				start: 0,
				pageIndex: 1  
			}
		}
	}
	static contextTypes = {
		router: React.PropTypes.object
	}
	componentWillReceiveProps(nextProps) {
		this.fetch(nextProps.params.movieType)
	}
	componentDidMount() {
		/*setTimeout(() => {
			this.setState({
				isLoading: false,
				movieListData: []
			})
		}, 3000)*/
		this.fetch(this.state.messages.movieType)
	}
	componentDidUpdate() {
		if(this.state.isLoading) {
			this.refs.scroll_container.onscroll = null
			this.fetch(this.state.messages.movieType)
		} else {
			this.addEventListener()
		}
	}

	// 为滚动的容器添加滚动监听事件
	addEventListener = () => {
		this.refs.scroll_container.onscroll = e => {
			// console.log(e.target.scrollHeight+'==='+e.target.scrollTop+'==='+e.target.offsetHeight)
			if(e.target.scrollHeight == e.target.scrollTop + e.target.offsetHeight) {
				// 如果到底了,直接返回,防止手贱多次触发滚动事件
				if(this.state.isBottom) {
					return
				}
				this.fetch(this.state.messages.movieType)
				this.setState({
					isBottom: true
				})
			}
		}
	}
	// 请求数据的方法,自定义函数使用箭头函数的格式
	fetch = (movieType) => {
		// const _this = this
		// 判断电影类别是否切换了,如果切换了电影类别,所有数据重置
		if (this.state.messages.movieType != movieType) {
			this.setState({
				// 是否显示加载效果
				isLoading: true,
				// 是否到底了
				isBottom: false,
				// 电影列表数据
				movieListData: [],
				// 只要是往服务器发送的数据都放在messages对象中
				messages: {
					movieType: movieType,
					count: 10,
					start: 0,
					pageIndex: 1
				}
			})
			return
		}
		// 深拷贝出来一个参数对象
		const messages = Object.assign({}, this.state.messages)
		let movieListData = [].concat(this.state.movieListData)
		// 修改分页信息
		messages.start = (messages.pageIndex - 1) * messages.count
		messages.pageIndex ++ 
		messages.movieType = movieType
		
		console.log(messages)
		const message = JSON.stringify(messages)

		const promise = service.getMovieListData(message)
		promise
			.then(data => {
				console.log(data)
				if(movieListData.length > 0) {
					movieListData = movieListData.concat(data.subjects)
				} else {
					movieListData = data.subjects
				}
				// 数据返回来之后需要重新设置状态,从而使页面重新渲染
				this.setState({
					isLoading: false,
					isBottom: false,
					movieListData: movieListData,
					messages: messages
				})
				// console.log(this.state.movieListData)
			})
			.catch(err => {
				console.log(err)
			})
	}

	goDetail = (id) => {
		this.context.router.push(`/movieDetail/${id}`)
	}

	// 渲染等待页面效果
	renderLoading = () => {
		return (
				<div ref='scroll_container' className='movieList_container'>
					正在加载数据......
				</div>
				)
	}
	// 循环渲染电影数据
	renderItem = (item) => {
		return(
			<div className='movieList_item' key={item.id} onClick={()=>this.goDetail(item.id)}>
				<img src={item.images.small}/>
				<div>
					<h5>{item.title}</h5>
					<p>{item.directors[0].name}</p>
					<p>{item.year}</p>
				</div>
			</div>
			)
	}
	// 渲染电影列表
	renderMovieList = () => {
		return (
			<div ref='scroll_container' className='movieList_container'>
				{this.state.movieListData.map(this.renderItem)}
				<div className={this.state.isBottom? 'movieList_show':'movieList_hide'}>
					正在玩命加载中,请等待...
				</div>
			</div>
			)
	}

	render() {
		if(this.state.isLoading) {
			return this.renderLoading()
		}
		return this.renderMovieList()		
	}
}