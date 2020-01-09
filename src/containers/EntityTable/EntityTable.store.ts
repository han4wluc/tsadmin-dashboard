import { action, observable, computed } from 'mobx';
import { EntityEventEmitter } from '~/services/emitters/entityEmitter';
import { BaseStore, IStoreDependencies } from '~/utils/mobxConnect';
import EntityService from '~/services/api/EntityService';
import ResourceStore from '~/stores/ResourceStore';

export type Entity = {
  id: number;
  label: string;
  columns: any;
};

export interface IEntityTableDependencies extends IStoreDependencies {
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}

export interface IEntityTableStore {
  entities: Entity[];
  entitiesLoading: boolean;
  selectedEntity: Entity;
  selectedEntityId: any;
  selectEntityId: (entityId: number) => void;
}

export class EntityTableStore extends BaseStore implements IEntityTableStore {
  private entityService: EntityService;
  @observable public entitiesResource: ResourceStore<Entity>;
  private entityEmitter: EntityEventEmitter;

  constructor(protected dependencies: IEntityTableDependencies) {
    super(dependencies);
    this.entityService = dependencies.entityService;
    this.entityEmitter = dependencies.entityEmitter;
    this.entitiesResource = new ResourceStore<Entity>([], x => x.id);
  }

  mount(): any {
    this.fetchEntities();
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

  @action selectEntityId = (entityId: number): void => {
    this.entitiesResource.setSelectedId(entityId);
  };
}
