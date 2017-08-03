import React from 'react'
import {Router, Route, Redirect, browserHistory, IndexRoute} from 'react-router'

import AppContainer from '../containers/AppContainer.jsx'
import HomeContainer from '../containers/HomeContainer.jsx'
// 以下组件采用动态按需加载
// import MovieContainer from '../containers/MovieContainer.jsx'
// import AboutContainer from '../containers/AboutContainer.jsx'
// import MovieListContainer from '../containers/MovieListContainer.jsx'
// import MovieDetailContainer from '../containers/MovieDetailContainer.jsx'
// import MovieSearchContainer from '../containers/MovieSearchContainer.jsx'

export default class Routers extends React.Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={AppContainer}>
          <IndexRoute component={HomeContainer}/>
          <Route path='home' component={HomeContainer}/>
          <Route
            path='movie'
            getComponent={
              (nextState, callback) => {
                require.ensure([], require => {
                  callback(null, require('../containers/MovieContainer.jsx').default)
                }, 'movie')
              }
            }
            onEnter={() => console.log('进入了movie路由')}
            onLeave={() => console.log('离开了movie路由')}
          >
            <IndexRoute
              getComponent={
                (nextState, callback) => {
                  require.ensure([], require => {
                    callback(null, require('../containers/MovieListContainer.jsx').default)
                  }, 'movieList')
                }
              }
            />
            {/* 绝对路由带有'/',不带'/'的路由基于父组件的路径 */}
            <Route path='/movieList/:movieType'
              getComponent={
                (nextState, callback) => {
                  require.ensure([], require => {
                    callback(null, require('../containers/MovieListContainer.jsx').default)
                  }, 'movieList')
                }
              }
            />
            <Route path='/movieDetail/:id'
              getComponent={
                (nextState, callback) => {
                  require.ensure([], require => {
                    callback(null, require('../containers/MovieDetailContainer.jsx').default)
                  }, 'movieDetail')
                }
              }
            />
            <Route path='/movieSearch/:keyword'
              getComponent={
                (nextState, callback) => {
                  require.ensure([], require => {
                    callback(null, require('../containers/MovieSearchContainer.jsx').default)
                  }, 'movieSearch')
                }
              }
            />
            {/* 路由重定向 */}
            {/*<Redirect from='movieList' to='/movieList'/>
            <Redirect from='movieDetail' to='/movieDetail'/>
            <Redirect from='movieSearch' to='/movieSearch'/>*/}
          </Route>
          <Route path='about'
            getComponent={
                (nextState, callback) => {
                  require.ensure([], require => {
                    callback(null, require('../containers/AboutContainer.jsx').default)
                  }, 'about')
                }
              }
          />
        </Route>
      </Router>
    )
  }
}
