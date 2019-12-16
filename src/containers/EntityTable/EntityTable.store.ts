

import { action, observable, computed } from 'mobx'
import { message} from 'antd'
import {BaseStore, IStoreDependencies} from '~/utils/mobxConnect'
import EntityService from '~/services/api/EntityService'
import ResourceStore from '~/stores/ResourceStore'
import ModalStore from '~/stores/ModalStore'

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
  private modalStore: ModalStore<any>

  constructor(protected dependencies: IEntityTableDependencies) {
    super(dependencies)
    this.entityService = dependencies.entityService
    this.entitiesResource = new ResourceStore<Entity>([], (x) => x.id)
    this.itemsResource = new ResourceStore<object>([], (x: any) => x.id)
    this.modalStore = new ModalStore<any>()
  }

  mount() {
      this.fetchEntities().then((entities) => {
        if (entities.length > 0) {
          this.selectEntityId(entities[0].id)
          this.fetchData()
        }
      })
  }

  @observable entitiesLoading: boolean = true
  @observable itemsLoading: boolean = true
  @observable createItemLoading: boolean = false

  @computed get entities() {
    return this.entitiesResource.items
  }

  @computed get columns() {
    if (!this.currentEntity) {
      return []
    }
    return this.currentEntity.columns
  }

  @computed get items() {
    return this.itemsResource.items
  }

  @computed get currentEntity() {
    return this.entitiesResource.selectedItem
  }

  @computed get currentEditItem() {
    return this.items.filter((i: any) => i.id == this.currentEditItemId)[0]
  }

  @computed get currentEditItemId() {
    if (!this.modalStore.payload) {
      return undefined
    }
    return this.modalStore.payload.itemId
  }

  @computed get modalMode() {
    if (!this.modalStore.payload) {
      return ModalMode.create
    }
    return this.modalStore.payload.mode
  }

  @computed get modalVisible() {
    return this.modalStore.visible
  }

  @computed get modalTitle() {
    return this.modalMode === ModalMode.create ? 'Create' : 'Edit'
  }

  @action fetchEntities = async () => {
    this.entitiesLoading = true
    const entities = (await this.entityService.fetchEntities())['entities']
    this.entitiesResource.replace(entities)
    this.entitiesLoading = false
    return Promise.resolve(entities)
 }

  @action selectEntityId = (entityId: number) => {
    this.entitiesResource.setSelectedId(entityId)
  }

  @action fetchData = async () => {
    if (!this.currentEntity) {
      return
    }
    this.itemsLoading = true
    try {
      const items = (await this.entityService.fetchItems(this.currentEntity.label))['items']
      this.itemsResource.replace(items)
    } catch (error) {
      message.error('network error')
    }
    this.itemsLoading = false
  }

  showCreateModal = () => {
    this.modalStore.show({
      mode: ModalMode.create,
      itemId: undefined
    })
  }

  onSubmitForm = (data: any) => {
    if (this.modalMode === ModalMode.create) {
      this.createItem(data)
      return
    }
    this.updateItem(data)
  }

  showUpdateModal = (itemId: string | number) => {
    this.modalStore.show({
      mode: ModalMode.update,
      itemId: itemId
    })
  }

  hideModal = () => {
    this.modalStore.hide({
      mode: ModalMode.create,
      itemId: undefined
    })
  }

  @action createItem = async (data: any) => {
    if (!this.currentEntity) {
      return
    }
    this.createItemLoading = true
    await this.entityService.createItem(this.currentEntity.label, data)
    this.createItemLoading = false
    this.hideModal()
    message.success('Update successful')
    this.fetchData()
  }

  @action updateItem = async (data: any) => {
    if (!this.currentEntity) {
      return
    }
    this.createItemLoading = true
    const item = await this.entityService.updateItem(this.currentEntity.label, this.currentEditItemId, data)
    this.itemsResource.append(item)
    message.success('Update successful')
    this.createItemLoading = false
    this.hideModal()
    return item
  }

  @action deleteItem = async(id: any) => {
    if (!this.currentEntity) {
      return
    }
    await this.entityService.deleteItem(this.currentEntity.label, id)
    message.success('Item deleted')
    this.fetchData()
  }
}
