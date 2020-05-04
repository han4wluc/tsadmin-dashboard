import { EntitiesStore } from '~/globalStores/entitiesStore';
import entityEmitter from '~/services/emitters/entityEmitter';

export interface IEntityTableDependencies {
  entitiesStore: EntitiesStore;
}

export class EntityTableStore {
  private entitiesStore: EntitiesStore;

  constructor(protected dependencies: IEntityTableDependencies) {
    this.entitiesStore = dependencies.entitiesStore;
  }

  get entities(): any[] {
    return this.entitiesStore.entities;
  }

  get entitiesLoading(): boolean {
    return this.entitiesStore.entitiesLoading;
  }

  get selectedEntityId(): any {
    return this.entitiesStore.selectedEntityId;
  }

  selectedEntity = (entity: any) => {
    entityEmitter.emitOnChooseEntity(entity);
    this.entitiesStore.selectEntityId(entity.id);
  };
}
