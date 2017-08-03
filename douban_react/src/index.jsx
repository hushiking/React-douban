import React from 'react'
import ReactDOM from 'react-dom'

// import {Router, hashHistory} from 'react-router'
// <Router routes={routeConfig} history={hashHistory}/>
// import routeConfig from './js/route-config.js'
import Routers from './js/Routers.jsx'

import './styles/root.css'

ReactDOM.render(
  <Routers/>,
  document.getElementById('app')
)
