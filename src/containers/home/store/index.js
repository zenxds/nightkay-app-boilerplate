import { observable } from 'mobx'

class Store {
  @observable helloMsg = ''
}

export default new Store()
