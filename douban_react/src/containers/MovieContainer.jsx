import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import '../styles/movie.css'

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieType: 'in_theaters',
      keyword: ''
    }
  }
  static propTypes = {
    children: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object
  }
  changeMovieType = (movieType) => {
    this.setState({
      movieType: movieType
    })
  }
  changeKeyword = (e) => {
    this.setState({
      movieType: this.state.movieType,
      keyword: e.target.value
    })
  }
  goMovieSearch = (keyword) => {
    this.context.router.push(`/movieSearch/${keyword}`)
    this.setState({
      movieType: this.state.movieType,
      keyword: ''
    })
  }
  render() {
    // console.log(this.props.params.movieType)
    return (
      <div className="movie_container">
        <div className="movie_menu">
          <Link onClick={() => this.changeMovieType('in_theaters')} className={this.state.movieType === 'in_theaters' ? 'movie_current' : ''} to="/movieList/in_theaters">正在热映</Link>
          <Link onClick={() => this.changeMovieType('coming_soon')} className={this.state.movieType === 'coming_soon' ? 'movie_current' : ''} to="/movieList/coming_soon">即将上映</Link>
          <Link onClick={() => this.changeMovieType('top250')} className={this.state.movieType === 'top250' ? 'movie_current' : ''} to="/movieList/top250">Top250</Link>
        </div>
        <div className="movie_right">
          <div className="movie_search">
            <input type="text" value={this.state.keyword} onChange={this.changeKeyword}/>
            <button onClick={() => this.goMovieSearch(this.state.keyword)}>搜索</button>
          </div>
          <div className="movie_content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
