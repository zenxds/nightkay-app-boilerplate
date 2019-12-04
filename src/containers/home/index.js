import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import * as decorators from 'decorators'
import actions from './actions'
import store from './store'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store
})
@inject('actions', 'store')
@observer
export default class Page extends Component {
  render() {
    return (
      <div>home</div>
    )
  }
}
