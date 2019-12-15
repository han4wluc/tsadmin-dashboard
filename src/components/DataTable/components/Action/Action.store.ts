
import { action, observable } from 'mobx'
import {message} from 'antd'
import {BaseStore, IStoreDependencies} from '~/utils/mobxConnect'
import EntityService from '~/services/api/EntityService'

export interface IActionDependencies extends IStoreDependencies {
    entityService: EntityService
}

export class ActionStore extends BaseStore {
  private entityService: EntityService

  constructor(protected dependencies: IActionDependencies) {
      super(dependencies)
      this.entityService = dependencies.entityService
  }

  @observable visible: boolean = false
  @observable loading: boolean = false

  @action show = () => {
      this.visible = true
  }

  @action hide = () => {
      this.visible = false
  }

  @action updateEntity = async(entity: any, id: any, data: any, callback: any) => {
    this.loading = true
    const item = await this.entityService.updateEntity(entity.label, id, data)
    message.success('Update successful')
    this.loading = false
    this.visible = false
    callback && callback(item)
    return item
  }

}

