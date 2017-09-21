import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeMovie from '../components/HomeMovie.jsx'

export default class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = () => PureRenderMixin.shouldComponentUpdate
        this.state = {

        }
    }
    render() {
        return (
            <HomeMovie />
        )
    }
}
