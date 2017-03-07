// 项目入口文件
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Routers from './Routers.js'
import '../styles/root.css'

// import Hello from '../components/Hello.js'
// import Life from '../components/Life.js'
// import FindDom from '../components/FindDom.jsx'
// import ListenEvent from '../components/ListenEvent.jsx'
// import ClickEvent from '../components/ClickEvent.js'
// import ControlForm from '../components/ControlForm.jsx'
// import Combination from '../components/Combination.jsx'
// import PropsCheck from '../components/PropsCheck.js'
// import Context from '../components/Context.js'
// import Animate from '../components/Animate.js'

// 组件渲染到真实dom节点
ReactDOM.render(
	<Routers/>,
	document.getElementById('app')
)