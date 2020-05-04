import { action, observable, computed } from 'mobx';
import { ResourceStore } from 'mobx-react-bind';
import EntityService, { entityService } from '~/services/api/EntityService';

export type Entity = {
  id: number;
  label: string;
  entity: string;
  columns: any;
};

export class EntitiesStore {
  constructor(private entityService: EntityService) {
    this.entitiesResource = new ResourceStore<Entity>([], x => x.id);
  }

  @observable entitiesResource: ResourceStore<Entity>;
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

  @action fetchEntities = async (): Promise<Entity[]> => {
    this.entitiesLoading = true;
    try {
      const entities = (await this.entityService.fetchEntities())['entities'];
      this.entitiesResource.replace(entities);
      this.entitiesResource.setSelectedId(entities[0].id);
      this.entitiesLoading = false;
      return entities;
    } catch (error) {
      console.warn(error);
      throw new Error('error');
    }
  };

  @action selectEntityId = (entityId: string | number): void => {
    this.entitiesResource.setSelectedId(entityId);
  };
}

export default new EntitiesStore(entityService);
