import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import '../styles/app.css'
import '../styles/font_awesome/css/font-awesome.css'

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        // React最基本优化方式，组件每次更新之前都要过一遍这个函数，返回true则更新，返回false则不更新
        // 默认情况下，这个函数会一直返回true，也就是说，如果有一些无效的改动触发了这个函数，也会导致无效的更新
        // 最好每个函数都写上这个函数
        this.shouldComponentUpdate = () => PureRenderMixin.shouldComponentUpdate
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
                <div className="app_footer">CopyRight &copy; 2016-2017</div>
            </div>
        )
    }
}
