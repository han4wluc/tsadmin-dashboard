import { message } from 'antd';

import { ApplicationStore } from '~/globalStores/applicationStore';
import EntityService from '~/services/api/EntityService';
import { EntityEventEmitter } from '~/services/emitters/entityEmitter';

export interface IHomeStoreDependencies {
  applicationStore: ApplicationStore;
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}

export class HomeStore {
  private applicationStore: ApplicationStore;
  private entityService: EntityService;
  private entityEmitter: EntityEventEmitter;

  constructor(dependencies: IHomeStoreDependencies) {
    this.applicationStore = dependencies.applicationStore;
    this.entityEmitter = dependencies.entityEmitter;
    this.entityService = dependencies.entityService;
  }

  get applicationIsLoading(): boolean {
    return this.applicationStore.isLoading;
  }

  get applicationServerIsConfigured(): boolean {
    return this.applicationStore.serverIsConfigured;
  }

  mount = (): void => {
    this.init();
  };

  init = async (): Promise<void> => {
    const url = localStorage.getItem('url') || '';
    const authToken = localStorage.getItem('authToken') || '';

    this.applicationStore.setUrl(url);

    if (!url) {
      this.applicationStore.setLoading(false);
      this.applicationStore.setServerIsConfigured(false);
      this.applicationStore.modalStore.visible = true;
      return;
    }

    try {
      const data = await this.entityService.authorize(url, authToken);
      if (!data.success) {
        this.applicationStore.setLoading(false);
        this.applicationStore.setServerIsConfigured(false);
        return;
      }
    } catch (error) {
      message.error('failed to authenticate');
      return;
    }

    this.entityService.setUrl(url);
    if (authToken) {
      this.entityService.setAuthToken(authToken);
    }

    this.applicationStore.setLoading(false);
    this.applicationStore.setServerIsConfigured(true);

    setImmediate(() => {
      this.entityEmitter.emitDoFetchEntities();
    });
  };
}
