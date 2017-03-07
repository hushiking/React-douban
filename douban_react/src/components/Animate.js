import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './animate.css'

export default class Animate extends Component {
	constructor(props) {
		super(props)
		this.state = {items: ['hello', 'world', 'click', 'me']}
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd() {
		const newItems = this.state.items.concat([prompt('Enter some text')])
		this.setState({items: newItems})
	}
	handleRemove(i) {
		let newItems = this.state.items.slice()
		newItems.splice(i, 1)
		this.setState({items: newItems})
	}
	render() {
		const items = this.state.items.map((item, i) => (
			/*此处箭头函数内部含有html代码,不使用大括号包裹函数体,使用小括号*/
			<div key = {item} onClick = {() => this.handleRemove(i)}>
				{item}
			</div>
		))
		return (
			<div>
				<button onClick = {this.handleAdd}> Add Item1 </button>
				<ReactCSSTransitionGroup
					component = 'div'
					transitionName = 'example'
					transitionAppear = {true}
					transitionEnterTimeout = {500}
					transitionLeaveTimeout = {300}
					transitionAppearTimeout = {500}
				>
					{items}
				</ReactCSSTransitionGroup>
			</div>
			)
	}
}