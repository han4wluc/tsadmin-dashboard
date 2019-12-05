
import { action, observable } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../utils/mobxConnect'
import CounterService from '../../services/api/CounterService'

export interface ITodoDependencies extends IStoreDependencies {
  syncCount: () => void
  counterService: CounterService
}

export class TodoStore extends BaseStore {
  constructor(
    protected dependencies: ITodoDependencies
  ) {
    super(dependencies)
  }

  @observable count = 0

  @action increment = () => {
      this.count += 1
      this.dependencies.syncCount()
  }

  @action decrement = () => {
      this.count -= 1
      this.dependencies.syncCount()
  }

}
