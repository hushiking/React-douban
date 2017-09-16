import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Loading from 'react-loading'

import './Loading.css'

export default class ComponentName extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = () => PureRenderMixin.shouldComponentUpdate
        this.state = {

        }
    }
    render() {
        return (
            <div className="loading_component">
                <Loading className="loading_loading" type="spin" color="red" />
            </div>
        )
    }
}
