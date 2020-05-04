import { action, observable, computed } from 'mobx';
import { ResourceStore } from 'mobx-react-bind';

import { EntityEventEmitter } from '~/services/emitters/entityEmitter';
import EntityService from '~/services/api/EntityService';
import { message } from 'antd';

export interface IEntityTableDependencies {
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}

export type Entity = {
  id: number;
  label: string;
  entity: string;
  columns: any;
};

export class EntityTableStore {
  private entitiesResource: ResourceStore<Entity>;
  private entityService: EntityService;
  private entityEmitter: EntityEventEmitter;

  constructor(protected dependencies: IEntityTableDependencies) {
    this.entityService = dependencies.entityService;
    this.entityEmitter = dependencies.entityEmitter;
    this.entitiesResource = new ResourceStore<Entity>([], x => x.id);
  }

  mount = (): Function => {
    const listener = this.entityEmitter.addDoFetchEntitiesListener(
      this.fetchEntities,
    );
    return (): void => {
      listener.remove();
    };
  };

  @observable entitiesLoading: boolean = true;

  @computed get entities(): any {
    return this.entitiesResource.items;
  }

  @computed get selectedEntity(): Entity {
    return this.entitiesResource.selectedItem;
  }

  @computed get selectedEntityId(): any {
    if (!this.entitiesResource.selectedItem) {
      return;
    }
    return this.entitiesResource.selectedItem.id;
  }

  @action setLoadingTrue = (): void => {
    this.entitiesLoading = true;
  };

  @action fetchEntities = async (): Promise<void> => {
    try {
      this.entitiesLoading = true;
      const entities = (await this.entityService.fetchEntities())['entities'];
      this.entitiesLoading = false;
      this.entitiesResource.replace(entities);
      if (entities.length > 0) {
        this.selectEntity(entities[0]);
      }
    } catch (error) {
      message.error('failed to fetch entities');
    }
  };

  @action selectEntity = (entity: any): void => {
    this.entitiesResource.setSelectedId(entity.id);
    this.entityEmitter.emitOnChooseEntity(entity);
  };
}
