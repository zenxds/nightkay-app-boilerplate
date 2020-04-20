import nightKay from 'night-kay'
// import * as constants from '../constants'
import store from '../store'

const BaseActions = nightKay.require('BaseActions')

class Actions extends BaseActions {}

export default new Actions(store)
