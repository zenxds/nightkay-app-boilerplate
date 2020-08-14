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
      <ConfigProvider locale={zhCN} getPopupContainer={getPopupContainer}>
        <App />
      </ConfigProvider>
    </Provider>,
    document.getElementById('app'),
  )
}

// 父元素如果有溢出隐藏之类的，需要额外再设置
function getPopupContainer(triggerNode) {
  let element = triggerNode

  if (!element) {
    return document.body
  }

  do {
    element = element.parentNode

    if (
      hasClass(element, 'xbee-modal-content') ||
      hasClass(element, 'app-content')
    ) {
      return element
    }
  } while (element)

  return document.body
}

function hasClass(element, className) {
  if (!element || !element.classList) {
    return false
  }

  return element.classList.contains(className)
}
