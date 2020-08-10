import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout } from '@dx/xbee'

import * as decorators from '@decorators'
import actions from './actions'
import store from './store'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
@inject('actions', 'store')
@observer
export default class Page extends Component {
  async componentDidMount() {
    const msg = await this.props.actions.getMsg()

    if (msg) {
      this.props.actions.merge({
        helloMsg: msg.helloMsg,
      })
    }
  }

  render() {
    return (
      <Layout.DxMain title="Home">
        <div>{this.props.store.helloMsg}</div>
      </Layout.DxMain>
    )
  }
}
