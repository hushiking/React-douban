/*电影容器组件*/
import React, {Component} from 'react'
import service from '../services/movieService.js'

import '../styles/movieDetail.css'

export default class MovieDetailContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// 是否显示加载效果
			isLoading: true,
			// 电影列表数据
			movieDetailData: []
		}
	}
	// static contextTypes = {
	// 	router: React.PropTypes.object
	// }
	// componentDidMount() {
	// 	setTimeout(() => {
	// 		console.log(this.context.router)
	// 		this.context.router.push('/home')
	// 	}, 3000)
		// service.getMovieDetailData()
	// }
	componentDidMount() {
		this.fetch(this.props.params.id)
	}

	fetch = (id) => {
		const promise = service.getMovieDetailData(id)
		promise.then(
			data => {
				console.log(data)
				this.setState({
					isLoading: false,
					movieDetailData: data
				})
			}).catch(err => {
				console.log(err)
		})
	}
	// 渲染等待效果
	renderLoading = () => {
		return(
			<div>
				正在加载数据......
			</div>
			)
	}
	// 渲染电影详细
	renderMovieDetail = () => {
		return(
			<div className="movieDetail_container">
				<div className="movieDetail_image">
					<img src={this.state.movieDetailData.images.large} alt=""/>
				</div>
				<div>
					<h1>{this.state.movieDetailData.title}</h1>
					<p>{this.state.movieDetailData.year}</p>
					<p>{this.state.movieDetailData.summary}</p>
				</div>
			</div>
			)
	}

	render() {
		if(this.state.isLoading) {
			return this.renderLoading()
		}
		return this.renderMovieDetail() 
	}
}