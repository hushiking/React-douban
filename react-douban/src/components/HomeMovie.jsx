import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import Loading from '../components/Loading.jsx'
import service from '../services/homeMovieService.js'

import './homeMovie.scss'

class HomeMovie extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            index: 0,
            isLoading: true,
            homeMovieList: []
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        /* const opt = {
            auto: 2500,
            callback: function (index) {
                // 更新当前轮播图的 index
                this.setState({
                    index
                })
            }.bind(this)
        } */
        if (this.state.isLoading) {
            return this.renderLoading()
        }
        return this.renderHomeMovie()
        /* return (
            <div style={{ height: '100%' }}>
                {
                    this.state.homeMovieList.length
                        ? <div className="box-container">
                            <ReactSwipe swipeOptions={opt}>
                                {this.state.homeMovieList.map(this.renderItem)}
                            </ReactSwipe>
                            <div className="index-container">
                                <ul>
                                    <li className={this.state.index === 0 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 1 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 2 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 3 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 4 ? 'selected' : ''}></li>
                                </ul>
                            </div>
                        </div>
                        : <div></div>
                }
            </div>
        ) */
    }
    // 循环渲染北美电影数据
    renderHomeMovie = () => {
        const opt = {
            auto: 2500,
            callback: function (index) {
                // 更新当前轮播图的 index
                this.setState({
                    index
                })
            }.bind(this)
        }
        return (
            <div style={{ height: '100%' }}>
                {
                    this.state.homeMovieList.length
                        ? <div className="box-container">
                            <ReactSwipe swipeOptions={opt}>
                                {this.state.homeMovieList.map(this.renderItem)}
                            </ReactSwipe>
                            <div className="index-container">
                                <ul>
                                    <li className={this.state.index === 0 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 1 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 2 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 3 ? 'selected' : ''}></li>
                                    <li className={this.state.index === 4 ? 'selected' : ''}></li>
                                </ul>
                            </div>
                        </div>
                        : <div></div>
                }
            </div>
        )
    }
    // 渲染loading效果
    renderLoading = () => {
        console.log('loading...')
        return (
            <Loading />
        )
    }
    // 新电影集的每个项
    renderItem = (item) => {
        return (
            <div className="carousel-item" key={item.subject.id} onClick={() => this.goDetail(item.subject.id)}>
                <img src={item.subject.images.large} alt="" />
                <div>
                    <h1>{item.subject.title}</h1>
                    <span>{item.subject.year}</span>
                </div>
            </div>
        )
    }
    // 请求数据
    fetch = () => {
        // 接收service发送的fetch请求返回的promise对象
        const promise = service.getHomeMovieData()
        console.log(promise)
        promise.then(
            data => {
                console.log(data.subjects)
                // 保留5条电影数据轮播
                const halfSubjects = data.subjects.splice(0, 5)
                this.setState({
                    homeMovieList: halfSubjects,
                    isLoading: false
                })
            }
        ).catch(err => {
            console.error(err)
        })
    }
}

export default HomeMovie
