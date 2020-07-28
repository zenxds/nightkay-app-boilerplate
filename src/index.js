/**
 * 入口
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from '@dx/xbee'
import zhCN from '@dx/xbee/es/locale/zh_CN'
import 'moment/locale/zh-cn'

import '@dx/xbee/xbee.less'
import '@dx/xpanda/xpanda.less'
import App from './App'

// 不允许在@action之外进行状态的修改
configure({ enforceActions: 'observed' })

const injects = {
  userStore: {},
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
