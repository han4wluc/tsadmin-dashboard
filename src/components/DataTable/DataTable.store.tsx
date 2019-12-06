
import { action, observable } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../utils/mobxConnect'

export interface IDataTableDependencies extends IStoreDependencies {}

export class DataTableStore extends BaseStore {
  @observable visible: boolean = false

  @action show = () => {
      this.visible = true
  }

  @action hide = () => {
      this.visible = false
  }

}

