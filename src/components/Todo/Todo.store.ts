
import { action, observable } from 'mobx'

export class TodoStore {

  static instance: any

  static getInstance() {
    if (!this.instance) {
      this.instance = new TodoStore()
    }
    return this.instance
  }

  @observable count = 0

  @action increment = () => {
      this.count += 1
  }

  @action decrement = () => {
      this.count -= 1
  }

}
