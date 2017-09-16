import React from 'react'
import ReactDOM from 'react-dom'

// import {Router, hashHistory} from 'react-router'
// import routeConfig from './js/route-config.js'
// <Router routes={routeConfig} history={hashHistory}/>
import Routers from './js/Routers.jsx'

import './styles/root.css'
// 性能检测：运行程序，在操作之前先运行Perf.start()开启检测，然后进行若干操作，运行Perf.stop()停止检测
// 然后在运行Perf.printWasted()即可打印出浪费性能的组件列表
// 如果每次操作多浪费几毫秒、几十毫秒，没必要深究，如果浪费过多影响了用户体验，就必须去优化它
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}

ReactDOM.render(
    <Routers />,
    document.getElementById('app')
)
