import { message } from 'antd';

import EntityService from '~/services/api/EntityService';
import { EntityEventEmitter } from '~/services/emitters/entityEmitter';
import { ApplicationStore } from '~/globalStores/applicationStore';

function addTrailingSlash(url: string): string {
  if (url[url.length - 1] === '/') {
    return url;
  }
  return url + '/';
}

export interface ISettingsStoreDependencies {
  applicationStore: ApplicationStore;
  entityService: EntityService;
  entityEmitter: EntityEventEmitter;
}
export class SettingsStore {
  private applicationStore: ApplicationStore;
  private entityService: EntityService;
  private entityEmitter: EntityEventEmitter;

  constructor(protected dependencies: ISettingsStoreDependencies) {
    this.applicationStore = dependencies.applicationStore;
    this.entityService = dependencies.entityService;
    this.entityEmitter = dependencies.entityEmitter;
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

  show = (): void => {
    this.applicationStore.modalStore.show('');
  };

  submit = async (values: any): Promise<any> => {
    const { url, authToken } = values;
    const urlWithSlash = addTrailingSlash(url);

    try {
      const data = await this.entityService.authorize(urlWithSlash, authToken);
      if (!data.success) {
        message.error('invalid url token combination');
        return;
      }
      this.applicationStore.setUrl(urlWithSlash);
      this.entityService.setUrl(urlWithSlash);
      this.entityService.setAuthToken(authToken);

      localStorage.setItem('url', urlWithSlash);
      localStorage.setItem('authToken', values.authToken);

      this.applicationStore.modalStore.hide();
      this.applicationStore.setServerIsConfigured(true);
      this.applicationStore.setLoading(false);

      this.entityEmitter.emitDoFetchEntities();
    } catch (error) {
      message.error('invalid url token combination');
      return;
    }
  };
}
