import { BaseStore, IStoreDependencies } from '~/utils/mobxConnect';
import ModalStore from '~/stores/ModalStore';
import { AxiosInstance } from 'axios';
import EntityService from '~/services/api/EntityService';
import { message } from 'antd';

export interface ISettingsStoreDependencies extends IStoreDependencies {
  entityService: EntityService;
}

export class SettingsStore extends BaseStore {
  public modalStore: ModalStore<any>;

  entityService: EntityService;
  url = '';

  constructor(protected dependencies: ISettingsStoreDependencies) {
    super(dependencies);
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

    try {
      await this.entityService.authorize(url, authToken);

      this.url = url;
      this.entityService.setUrl(url);
      this.entityService.setAuthToken(authToken);

      this.modalStore.hide();
      localStorage.setItem('url', values.url);
      localStorage.setItem('authToken', values.authToken);
      message.success('Success');
    } catch (error) {
      console.warn('error', error);
      message.error('Invalid url and token combination');
    }
  };
}
