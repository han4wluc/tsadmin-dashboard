
import { action, observable, computed } from 'mobx'
import { message} from 'antd'
import {EntityEventEmitter} from '~/services/emitters/entityEmitter'
import {BaseStore, IStoreDependencies} from '~/utils/mobxConnect'
import EntityService from '~/services/api/EntityService'
import ResourceStore from '~/stores/ResourceStore'
import ModalStore from '~/stores/ModalStore'

export type Entity = {
    id: number,
    label: string,
    columns: any
}

export interface IItemsTableDependencies extends IStoreDependencies {
  entityService: EntityService,
  entityEmitter: EntityEventEmitter
}

enum ModalMode {
  create = 'create',
  update = 'update'
}

export class ItemsTableStore extends BaseStore {

  private entityService: EntityService
  private itemsResource: ResourceStore<object>
  private modalStore: ModalStore<any>
  private entityEmitter: EntityEventEmitter

  constructor(protected dependencies: IItemsTableDependencies) {
    super(dependencies)
    this.entityService = dependencies.entityService
    this.entityEmitter = dependencies.entityEmitter
    this.itemsResource = new ResourceStore<object>([], (x: any) => x.id)
    this.modalStore = new ModalStore<any>()
  }

  mount() {
    const listerner = this.entityEmitter.addOnChooseEntityListerner((entity) => {
        this.selectedEntity = entity
        this.fetchData()
    })
    return listerner.remove
  }

  @observable entitiesLoading: boolean = true
  @observable itemsLoading: boolean = true
  @observable createItemLoading: boolean = false
  @observable selectedEntity: any

  @computed get columns() {
    if (!this.selectedEntity) {
      return []
    }
    return this.selectedEntity.columns
  }

  @computed get currentEditItem() {
    return this.items.filter((i: any) => i.id == this.currentEditItemId)[0]
  }

  @computed get items() {
    return this.itemsResource.items
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

  @action fetchData = async () => {
    if (!this.selectedEntity) {
      return
    }
    this.itemsLoading = true
    try {
      const items = (await this.entityService.fetchItems(this.selectedEntity.label))['items']
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
    if (!this.selectedEntity) {
      return
    }
    this.createItemLoading = true
    await this.entityService.createItem(this.selectedEntity.label, data)
    this.createItemLoading = false
    this.hideModal()
    message.success('Update successful')
    this.fetchData()
  }

  @action updateItem = async (data: any) => {
    if (!this.selectedEntity) {
      return
    }
    this.createItemLoading = true
    const item = await this.entityService.updateItem(this.selectedEntity.label, this.currentEditItemId, data)
    this.itemsResource.append(item)
    message.success('Update successful')
    this.createItemLoading = false
    this.hideModal()
    return item
  }

  @action deleteItem = async(id: any) => {
    if (!this.selectedEntity) {
      return
    }
    await this.entityService.deleteItem(this.selectedEntity.label, id)
    message.success('Item deleted')
    this.fetchData()
  }
}
