

import { action, observable, computed } from 'mobx'
import { message} from 'antd'
import {BaseStore, IStoreDependencies} from '~/utils/mobxConnect'
import EntityService from '~/services/api/EntityService'
import ResourceStore from '~/stores/ResourceStore'

export type Entity = {
    id: number,
    label: string,
    columns: any
}

export interface IEntityTableDependencies extends IStoreDependencies {
  entityService: EntityService
}

enum ModalMode {
  create = 'create',
  update = 'update'
}

export class EntityTableStore extends BaseStore {

  private entityService: EntityService
  private entitiesResource: ResourceStore<Entity>
  private itemsResource: ResourceStore<object>

  constructor(protected dependencies: IEntityTableDependencies) {
    super(dependencies)
    this.entityService = dependencies.entityService
    this.entitiesResource = new ResourceStore<Entity>([], (x) => x.id)
    this.itemsResource = new ResourceStore<object>([], (x: any) => x.id)
  }

  @observable entitiesLoading: boolean = true
  // @observable entities: Entity[] = []
  @observable selectedEntityId?: number
  // @observable items: object[] = []
  @observable itemsLoading: boolean = true
  @observable columns: any = []
  @observable modalVisible: boolean = false
  @observable modalMode: ModalMode = ModalMode.create
  @observable createItemLoading: boolean = false
  @observable currentEditItemId?: number | string

  @computed get entities() {
    return this.entitiesResource.items
  }

  @computed get items() {
    return this.itemsResource.items
  }

  @computed get currentEntity() {
    if(this.selectedEntityId === undefined) {
      return null
    }
    const entity = this.entities.filter(e => e.id === this.selectedEntityId)[0]
    return entity
  }

  @computed get currentEditItem() {
    console.warn('this.items', this.items, this.items.filter)
    return this.items.filter((i: any) => i.id == this.currentEditItemId)[0]
  }

  @computed get modalTitle() {
    return this.modalMode === ModalMode.create ? 'Create' : 'Edit'
  }

  @action fetchEntities = async () => {
    this.entitiesLoading = true
    const entities = (await this.entityService.fetchEntities())['entities']
    this.entitiesResource.replace(entities)
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
    const items = (await this.entityService.fetchItems(this.currentEntity.label))['items']
    this.itemsResource.replace(items)
    if (this.currentEntity){
      this.columns = this.currentEntity.columns
    }
    this.itemsLoading = false
  }

  @action showModal = (modalMode: ModalMode) => {
    this.modalVisible = true
    this.modalMode = modalMode
  }

  @action showCreateModal = () => {
    this.currentEditItemId = undefined
    this.showModal(ModalMode.create)
  }


  onSubmitForm = (data: any) => {
    if (this.modalMode === ModalMode.create) {
      this.createItem(data)
      return
    }
    this.updateItem(data)
  }



  @action showUpdateModal = (itemId: string | number) => {
    this.currentEditItemId = itemId
    this.showModal(ModalMode.update)
  }

  @action hideModal = () => {
    this.modalVisible = false
  }

  @action createItem = async (data: any) => {
    if (!this.currentEntity) {
      return
    }
    this.createItemLoading = true
    await this.entityService.createItem(this.currentEntity.label, data)
    this.createItemLoading = false
    this.modalVisible = false
    message.success('Update successful')
    this.fetchData()
  }

  @action updateItem = async (data: any) => {
    if (!this.currentEntity) {
      return
    }
    this.createItemLoading = true
    const item = await this.entityService.updateItem(this.currentEntity.label, this.currentEditItemId, data)
    // this.replaceOneItem(item)
    this.itemsResource.append(item)
    message.success('Update successful')
    this.createItemLoading = false
    this.modalVisible = false
    return item
  }

  // @action replaceOneItem = async (item: any) => {
  //   const items = this.items.concat([])
  //   const index = items.map((i:any) => i.id).indexOf(item.id)
  //   if (index !== -1) {
  //     items[index] = item
  //   }
  //   this.items = items
  // }

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
