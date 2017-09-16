import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = () => PureRenderMixin.shouldComponentUpdate
        this.state = {

        }
    }
    render() {
        return (
            <div>
                这是首页容器组件
      </div>
        )
    }
}
