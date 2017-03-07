/*电影容器组件*/
import React, {Component} from 'react'
import service from '../services/movieService.js'

import '../styles/movieList.css'

export default class MovieSearchContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// 是否显示等待效果
			isLoading: true,
			isBottom: false,
			// 电影列表数据
			movieListData: [],
			// 只要是向服务器发送的数据都放在messages对象中
			messages: {
				keyword: this.props.params.keyword,
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
		this.fetch(nextProps.params.keyword)
	}
	componentDidMount() {
		this.fetch(this.state.messages.keyword)
	}
	componentDidUpdate() {
		if(this.state.isLoading) {
			this.refs.scroll_container.onscroll = null
			this.fetch(this.state.messages.keyword)
		} else {
			this.addEventListener()
		}
	}

	// 为滚动容器添加滚动监听事件
	addEventListener = () => {
		this.refs.scroll_container.onscroll = e => {
			if(e.target.scrollHeight == e.target.scrollTop + e.target.offsetHeight) {
				// 如果到底了,直接返回,防止手贱多次触发滚动事件
				if(this.state.isBottom) {
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
		if(this.state.messages.keyword != keyword) {
			this.setState({
				isLoading: true,
				isBottom: false,
				movieListData: [],
				messages: {
					keyword: keyword,
					count: 10,
					start: 0,
					pageIndex: 1
				}
			})
			return
		}
		// 深拷贝出来一个参数对象
		let messages = Object.assign({}, this.state.messages)
		let movieListData = [].concat(this.state.movieListData)
		// 修改分页信息
		messages.keyword = keyword
		messages.start = (messages.pageIndex - 1)*messages.count
		messages.pageIndex ++

		// 参数传递
		const message = JSON.stringify(messages)
		const promise = service.searchMovieListData(message)
		promise.then(
			data => {
				if(movieListData.length > 0) {
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
			},
			err => {

			}).catch(err => {
			console.log(err)
		})
	}
	goDetail = (id) => {
		this.context.router.push(`/movieDetail/${id}`)
	}

	// 渲染等待页面
	renderLoading = () => {
		return(
			<div ref='scroll_container' className='movieList_container'>
				正在加载数据......
			</div>
		)
	}
	// 循环渲染电影数据
	renderItem = (item) => {
		return(
			<div className='movieList_item' key={item.id + Math.random()} onClick={() => this.goDetail(item.id)}>
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
		return(
			<div ref='scroll_container' className='movieList_container'>
				{this.state.movieListData.map(this.renderItem)}
				<div className={this.state.isBottom? 'movieList_show': 'movieList_hide'}>
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