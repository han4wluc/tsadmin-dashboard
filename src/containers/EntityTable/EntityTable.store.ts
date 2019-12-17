

import { action, observable, computed } from 'mobx'
import {EntityEventEmitter} from '~/services/emitters/entityEmitter'
import {BaseStore, IStoreDependencies} from '~/utils/mobxConnect'
import EntityService from '~/services/api/EntityService'
import ResourceStore from '~/stores/ResourceStore'

export type Entity = {
    id: number,
    label: string,
    columns: any
}

export interface IEntityTableDependencies extends IStoreDependencies {
  entityService: EntityService,
  entityEmitter: EntityEventEmitter
}

export class EntityTableStore extends BaseStore {

  private entityService: EntityService
  @observable public entitiesResource: ResourceStore<Entity>
  private entityEmitter: EntityEventEmitter

  constructor(protected dependencies: IEntityTableDependencies) {
    super(dependencies)
    this.entityService = dependencies.entityService
    this.entityEmitter = dependencies.entityEmitter
    this.entitiesResource = new ResourceStore<Entity>([], (x) => x.id)
  }

  mount() {
      this.fetchEntities()
  }

  @observable entitiesLoading: boolean = true

  @computed get entities() {
    return this.entitiesResource.items
  }

  @computed get selectedEntity() {
    return this.entitiesResource.selectedItem
  }

  @action fetchEntities = async () => {
    this.entitiesLoading = true
    try {
      const entities = (await this.entityService.fetchEntities())['entities']
      this.entitiesResource.replace(entities)
      this.entitiesResource.setSelectedId(entities[0].id)
      this.entityEmitter.emitOnChooseEntity(this.selectedEntity)
    } catch (error) {
      console.warn(error)
    }
    this.entitiesLoading = false

 }

  @action selectEntityId = (entityId: number) => {
    this.entitiesResource.setSelectedId(entityId)
  }

}
