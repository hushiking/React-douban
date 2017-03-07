import React, {Component} from 'react'
import {Router, Route, Link,Redirect, hashHistory,browserHistory, IndexRoute} from 'react-router'

import AppContainer from '../containers/AppContainer.js'
import HomeContainer from '../containers/HomeContainer.js'
import MovieContainer from '../containers/MovieContainer.js'
import AboutContainer from '../containers/AboutContainer.js'
import MovieListContainer from '../containers/MovieListContainer.js'
import MovieDetailContainer from '../containers/MovieDetailContainer.js'
import MovieSearchContainer from '../containers/MovieSearchContainer.js'

export default class Routers extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<Router history = {browserHistory}>
				<Route path = '/' component = {AppContainer}>
					<IndexRoute component = {HomeContainer}/>
					<Route path = 'home' component = {HomeContainer}/>
					<Route 
						path = 'movie' 
						component = {MovieContainer}
						onEnter = {() => console.log('进入了movie路由')}
						onLeave = {() => console.log('离开了movie路由')}
						>
						<IndexRoute component = {MovieListContainer}/>
						{/*绝对路由带有'/',不带'/'的路由基于父组件的路径*/}
						<Route path = '/movieList/:movieType' component = {MovieListContainer}/>
						<Route path = '/movieDetail/:id' component = {MovieDetailContainer}/>
						<Route path = '/movieSearch/:keyword' component = {MovieSearchContainer}/>

						<Redirect from = 'movieList' to = '/movieList'/>
						<Redirect from = 'movieDetail' to = '/movieDetail'/>
						<Redirect from = 'movieSearch' to = '/movieSearch'/>
					</Route>
					<Route path = 'about' component = {AboutContainer}/>
				</Route>
			</Router>
			)
	}
}