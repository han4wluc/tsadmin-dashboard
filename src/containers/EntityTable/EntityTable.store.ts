import { action, observable, computed } from 'mobx';
import { EntityEventEmitter } from '~/services/emitters/entityEmitter';

import EntityService from '~/services/api/EntityService';
import ResourceStore from '~/stores/ResourceStore';

export type Entity = {
  id: number;
  label: string;
  columns: any;
};

export interface IEntityTableDependencies {
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}

export interface IEntityTableStore {
  entities: Entity[];
  entitiesLoading: boolean;
  selectedEntity: Entity;
  selectedEntityId: any;
  selectEntityId: (entityId: string | number) => void;
}

export class EntityTableStore implements IEntityTableStore {
  private entityService: EntityService;
  @observable public entitiesResource: ResourceStore<Entity>;
  private entityEmitter: EntityEventEmitter;

  constructor(protected dependencies: IEntityTableDependencies) {
    this.entityService = dependencies.entityService;
    this.entityEmitter = dependencies.entityEmitter;
    this.entitiesResource = new ResourceStore<Entity>([], x => x.id);
  }

  mount(): any {
    setTimeout(() => {
      this.fetchEntities();
    }, 100);
  }

  @observable entitiesLoading: boolean = true;

  @computed get entities(): any {
    return this.entitiesResource.items;
  }

  @computed get selectedEntity() {
    return this.entitiesResource.selectedItem;
  }

  @computed get selectedEntityId(): any {
    if (!this.entitiesResource.selectedItem) {
      return;
    }
    return this.entitiesResource.selectedItem.id;
  }

  @action fetchEntities = async (): Promise<void> => {
    this.entitiesLoading = true;
    try {
      const entities = (await this.entityService.fetchEntities())['entities'];
      this.entitiesResource.replace(entities);
      this.entitiesResource.setSelectedId(entities[0].id);
      this.entityEmitter.emitOnChooseEntity(this.selectedEntity);
    } catch (error) {
      console.warn(error);
    }
    this.entitiesLoading = false;
  };

  @action selectEntityId = (entityId: string | number): void => {
    this.entitiesResource.setSelectedId(entityId);
    this.entityEmitter.emitOnChooseEntity(this.selectedEntity);
  };
}
