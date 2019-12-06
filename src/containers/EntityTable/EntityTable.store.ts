

import { action, observable, computed } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../utils/mobxConnect'
import EntityService from '../../services/api/EntityService'

export type Entity = {
    id: number,
    label: string,
    columns: any
}

export interface IEntityTableDependencies extends IStoreDependencies {
  entityService: EntityService
}

export class EntityTableStore extends BaseStore {

  private entityService: EntityService

  constructor(protected dependencies: IEntityTableDependencies) {
    super(dependencies)
    this.entityService = dependencies.entityService
  }

  @observable entitiesLoading: boolean = true
  @observable entities: Entity[] = []
  @observable selectedEntityId?: number
  @observable items: object[] = []
  @observable itemsLoading: boolean = true
  @observable columns: any = []
  @observable modalVisible: boolean = false

  @computed get currentEntity() {
    if(this.selectedEntityId === undefined) {
      return null
    }
    const entity = this.entities.filter(e => e.id === this.selectedEntityId)[0]
    return entity
  }

  @action fetchEntities = async () => {
    this.entitiesLoading = true
    this.entities = (await this.entityService.fetchEntities())['entities']
    this.entitiesLoading = false
    return Promise.resolve()
 }

  @action selectEntityId = (entityId: number) => {
      this.selectedEntityId = entityId
      this.fetchData()
  }

  @action fetchData = async () => {
    this.itemsLoading = true
    this.items = (await this.entityService.fetchItems())['items']
    if (this.currentEntity){
      this.columns = this.currentEntity.columns
    }
    this.itemsLoading = false
  }

  @action showModal = () => {
    this.modalVisible = true
  }

  @action hideModal = () => {
    this.modalVisible = false
  }

  mount() {
      this.fetchEntities().then(() => {
        if (this.entities.length > 0) {
          this.selectEntityId(this.entities[0].id)
        }
      })
    }
}
