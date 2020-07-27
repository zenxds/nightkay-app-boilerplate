/**
 * 入口
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from '@dx/xbee'
import zhCN from '@dx/xbee/es/locale/zh_CN'
import 'moment/locale/zh-cn'

import '@dx/xbee/xbee.less'
import '@dx/xpanda/xpanda.less'

// 不允许在@action之外进行状态的修改
configure({ enforceActions: 'observed' })

const APP_ENTRY = window.APP_ENTRY || {}
const injects = {
  userStore: {},
}

window.nightKay.registerApplication('app', {
  path: '/app',
  entry: APP_ENTRY.app || 'main.js',
})

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {window.nightKay.routes()}

          <Route path="/" render={() => <Redirect to="/app/home" />} />
        </Switch>
      </Router>
    )
  }
}

if (window.Proxy) {
  ReactDOM.render(
    <Provider {...injects}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>,
    document.getElementById('app'),
  )
}
