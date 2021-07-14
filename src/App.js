import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import nightKay from 'night-kay'

import Home from './containers/home'

const APP_ENTRY = window.APP_ENTRY || {}

nightKay.registerApplication('app', {
  path: '/app',
  entry: APP_ENTRY.app || 'main.js',
})

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app/home" render={props => <Home {...props} />} />
        <Route path="/" render={() => <Redirect to="/app/home" />} />
      </Switch>
    </Router>
  )
}

export default App
