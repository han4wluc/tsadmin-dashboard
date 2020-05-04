import { message } from 'antd';

import { ApplicationStore } from '~/globalStores/applicationStore';
import { EntitiesStore } from '~/globalStores/entitiesStore';
import entityEmitter from '~/services/emitters/entityEmitter';

export interface IHomeStoreDependencies {
  applicationStore: ApplicationStore;
  entitiesStore: EntitiesStore;
}

export class HomeStore {
  private applicationStore: ApplicationStore;
  private entitiesStore: EntitiesStore;

  constructor(dependencies: IHomeStoreDependencies) {
    this.applicationStore = dependencies.applicationStore;
    this.entitiesStore = dependencies.entitiesStore;
  }

  get applicationIsLoading(): boolean {
    return this.applicationStore.isLoading;
  }

  get applicationServerIsConfigured(): boolean {
    return this.applicationStore.serverIsConfigured;
  }

  get url(): string {
    return this.applicationStore.url;
  }

  get visible(): boolean {
    return this.applicationStore.modalStore.visible;
  }

  hide = (): void => {
    if (!this.applicationStore.serverIsConfigured) {
      return;
    }
    this.applicationStore.modalStore.hide();
  };

  submit = async (values: any): Promise<any> => {
    try {
      await this.applicationStore.submit(values);
      this.applicationStore.modalStore.hide();
      const entities = await this.entitiesStore.fetchEntities();
      if (entities.length > 0) {
        entityEmitter.emitOnChooseEntity(entities[0]);
      }
    } catch (error) {
      message.error('invalid url token');
    }
  };

  mount = () => {
    this.init();
  };

  init = async () => {
    const isAuthenticated = await this.applicationStore.checkServerConfiguration();
    if (isAuthenticated) {
      const entities = await this.entitiesStore.fetchEntities();
      if (entities.length > 0) {
        entityEmitter.emitOnChooseEntity(entities[0]);
      }
    } else {
      this.applicationStore.modalStore.show('');
    }
  };
}
