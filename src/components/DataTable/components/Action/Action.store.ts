
import { action, observable } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../../../utils/mobxConnect'
import EntityService from '../../../../services/api/EntityService'

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

  @action updateEntity = async() => {
    this.loading = true
    await this.entityService.updateEntity()
    this.loading = false
  }

}

