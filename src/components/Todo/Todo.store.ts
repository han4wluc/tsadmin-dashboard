
import { action, observable } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../utils/mobxConnect'

export interface ITodoDependencies extends IStoreDependencies {
  syncCount: () => void
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
