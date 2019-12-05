
import { action, observable } from 'mobx'

export class TodoStore {
  @observable count = 0

  @action increment = () => {
      this.count += 1
  }

  @action decrement = () => {
      this.count -= 1
  }
}
