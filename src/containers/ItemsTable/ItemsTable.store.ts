import { action, observable, computed } from 'mobx';
import { message } from 'antd';
import { EntityEventEmitter } from '~/services/emitters/entityEmitter';
import EntityService from '~/services/api/EntityService';
import { ModalStore, ResourceStore } from 'mobx-react-bind';

export type Entity = {
  id: number;
  label: string;
  columns: any;
};

export interface IItemsTableDependencies {
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}

enum ModalMode {
  create = 'create',
  update = 'update',
}

type Page = {
  num: number;
  size: number;
  total: number;
};

const sortConditionToString = (sortCondition: any) => {
  if (sortCondition === undefined || sortCondition.length === 0) {
    return undefined;
  }
  return sortCondition
    .map(({ id, operator }: any) => `${id}:${operator}`)
    .join(',');
};

const filterConditionToString = (filterCondition: any) => {
  if (filterCondition === undefined || filterCondition.length === 0) {
    return undefined;
  }
  const str = filterCondition
    .map(({ id, operator, value }: any) => `${id}:${operator}:${value}`)
    .join(',');
  return `and(${str})`;
};

export class ItemsTableStore {
  private entityService: EntityService;
  private itemsResource: ResourceStore<object>;
  private modalStore: ModalStore<any>;
  private entityEmitter: EntityEventEmitter;
  private currentFilterCondition?: any = [];
  private currentSortCondition?: any = [];

  constructor(protected dependencies: IItemsTableDependencies) {
    this.entityService = dependencies.entityService;
    this.entityEmitter = dependencies.entityEmitter;
    this.itemsResource = new ResourceStore<object>([], (x: any) => x.id);
    this.modalStore = new ModalStore<any>();
  }

  mount(): any {
    const listerner = this.entityEmitter.addOnChooseEntityListerner(entity => {
      this.selectedEntity = entity;
      this.itemsResource.replace([]);
      this.fetchData();
    });
    return listerner.remove;
  }

  @observable entitiesLoading: boolean = true;
  @observable itemsLoading: boolean = true;
  @observable createItemLoading: boolean = false;
  @observable selectedEntity: any;
  @observable page: Page = {
    num: 1,
    size: 20,
    total: 0,
  };
  @observable filterCondition?: any[];
  @observable sortCondition?: any[];

  @computed get pageInfo(): any {
    const page = this.page;
    return {
      current: page.num,
      pageSize: page.size,
      total: page.total,
    };
  }

  @computed get columns(): any {
    if (!this.selectedEntity) {
      return [];
    }
    return this.selectedEntity.columns;
  }

  @computed get currentEditItem(): any {
    return this.items.filter((i: any) => i.id == this.currentEditItemId)[0];
  }

  @computed get items(): object[] {
    return this.itemsResource.items;
  }

  @computed get currentEditItemId(): any {
    if (!this.modalStore.payload) {
      return undefined;
    }
    return this.modalStore.payload.itemId;
  }

  @computed get modalMode(): any {
    if (!this.modalStore.payload) {
      return ModalMode.create;
    }
    return this.modalStore.payload.mode;
  }

  @computed get modalVisible(): boolean {
    return this.modalStore.visible;
  }

  @computed get modalTitle(): string {
    return this.modalMode === ModalMode.create ? 'Create' : 'Edit';
  }

  @action setFilterCondition = (filterCondition: any): void => {
    this.filterCondition = filterCondition;
  };

  @action setSortCondition = (sortCondition: any): void => {
    this.sortCondition = sortCondition;
  };

  doSearch = () => {
    this.currentFilterCondition = this.filterCondition;
    this.currentSortCondition = this.sortCondition;
    this.fetchData();
  };

  @action fetchData = async (pageNum: number = 1): Promise<void> => {
    if (!this.selectedEntity) {
      return;
    }
    this.itemsLoading = true;
    try {
      const { items, page } = await this.entityService.fetchItems(
        this.selectedEntity.label,
        {
          params: {
            pageNum,
            pageSize: this.page.size,
            filter: filterConditionToString(this.currentFilterCondition),
            sort: sortConditionToString(this.currentSortCondition),
          },
        },
      );
      this.itemsResource.replace(items);
      this.page = page;
    } catch (error) {
      message.error('network error');
      console.warn('error', error);
    }
    this.itemsLoading = false;
  };

  @action createItem = async (data: any): Promise<void> => {
    if (!this.selectedEntity) {
      return;
    }
    try {
      this.createItemLoading = true;
      await this.entityService.createItem(this.selectedEntity.label, data);
      this.createItemLoading = false;
      this.hideModal();
      message.success('Create successful');
      this.fetchData();
    } catch (error) {
      message.error('Create failed');
    }
  };

  @action updateItem = async (data: any): Promise<void> => {
    if (!this.selectedEntity) {
      return;
    }
    try {
      this.createItemLoading = true;
      const item = await this.entityService.updateItem(
        this.selectedEntity.label,
        this.currentEditItemId,
        data,
      );
      this.itemsResource.append(item);
      message.success('Update successful');
      this.createItemLoading = false;
      this.hideModal();
      this.fetchData();
      return item;
    } catch (error) {
      message.error('Update failed');
    }
  };

  @action deleteItem = async (id: any): Promise<void> => {
    if (!this.selectedEntity) {
      return;
    }
    try {
      await this.entityService.deleteItem(this.selectedEntity.label, id);
      message.success('Item deleted');
      this.fetchData();
    } catch (error) {
      message.error('Delete failed');
    }
  };

  showCreateModal = (): void => {
    this.modalStore.show({
      mode: ModalMode.create,
      itemId: undefined,
    });
  };

  onSubmitForm = (data: any): void => {
    if (this.modalMode === ModalMode.create) {
      this.createItem(data);
      return;
    }
    this.updateItem(data);
  };

  showUpdateModal = (itemId: string | number): void => {
    this.modalStore.show({
      mode: ModalMode.update,
      itemId: itemId,
    });
  };

  hideModal = (): void => {
    this.modalStore.hide();
  };
}
