

import { action, observable, computed } from 'mobx'
import { message} from 'antd'
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
  @observable createEntityLoading: boolean = false

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
    if (!this.currentEntity) {
      return
    }
    this.itemsLoading = true
    this.items = (await this.entityService.fetchItems(this.currentEntity.label))['items']
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

  @action createEntity = async (data: any) => {
    if (!this.currentEntity) {
      return
    }
    this.createEntityLoading = true
    await this.entityService.createEntity(this.currentEntity.label, data)
    this.createEntityLoading = false
    this.modalVisible = false
    message.success('Update successful')
    this.fetchData()
  }

  @action replaceOneItem = async (item: any) => {
    const items = this.items.concat([])
    const index = items.map((i:any) => i.id).indexOf(item.id)
    if (index !== -1) {
      items[index] = item
    }
    this.items = items
  }

  @action deleteItem = async(id: any) => {
    if (!this.currentEntity) {
      return
    }
    await this.entityService.deleteItem(this.currentEntity.label, id)
    message.success('Item deleted')
    this.fetchData()
  }

  mount() {
      this.fetchEntities().then(() => {
        if (this.entities.length > 0) {
          this.selectEntityId(this.entities[0].id)
        }
      })
    }
}
