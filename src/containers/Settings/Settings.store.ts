import { ModalStore } from 'mobx-react-bind';
import { action, observable } from 'mobx';
import EntityService from '~/services/api/EntityService';
import { message } from 'antd';

export interface ISettingsStoreDependencies {
  entityService: EntityService;
}

function addTrailingSlash(url: string) {
  if (url[url.length - 1] === '/') {
    return url;
  }
  return url + '/';
}

export class SettingsStore {
  public modalStore: ModalStore<any>;

  entityService: EntityService;

  @observable
  url = '';

  constructor(protected dependencies: ISettingsStoreDependencies) {
    this.modalStore = new ModalStore<any>();
    this.entityService = dependencies.entityService;
  }

  mount = () => {
    const url = localStorage.getItem('url');
    this.url = url || '';
    const authToken = localStorage.getItem('authToken');
    if (url) {
      this.entityService.setUrl(url);
      if (authToken) {
        this.entityService.setAuthToken(authToken);
      }
    }
  };

  submit = async (values: any) => {
    const { url, authToken } = values;
    const urlWithSlash = addTrailingSlash(url);

    try {
      const data = await this.entityService.authorize(urlWithSlash, authToken);
      if (!data.success) {
        throw new Error('Invalid url');
      }

      this.url = urlWithSlash;
      this.entityService.setUrl(urlWithSlash);
      this.entityService.setAuthToken(authToken);

      this.modalStore.hide();
      localStorage.setItem('url', urlWithSlash);
      localStorage.setItem('authToken', values.authToken);
      message.success('Success');
    } catch (error) {
      console.warn('error', error);
      message.error('Invalid url and token combination');
    }
  };
}
