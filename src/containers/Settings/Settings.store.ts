import { BaseStore, IStoreDependencies } from '~/utils/mobxConnect';
import ModalStore from '~/stores/ModalStore';
import { AxiosInstance } from 'axios';

export interface ISettingsStoreDependencies extends IStoreDependencies {
  tsAdminClient: AxiosInstance;
}

export class SettingsStore extends BaseStore {
  public modalStore: ModalStore<any>;

  url = 'http://localhost:8000';
  tsAdminClient: AxiosInstance;

  constructor(protected dependencies: ISettingsStoreDependencies) {
    super(dependencies);
    this.modalStore = new ModalStore<any>();
    this.tsAdminClient = dependencies.tsAdminClient;
  }

  mount = () => {
    const url = localStorage.getItem('url');
    if (url) {
      this.url = url;
      this.tsAdminClient.defaults.baseURL = this.url;
    }
  };

  submit = async (values: any) => {
    this.url = values.url;
    this.tsAdminClient.defaults.baseURL = this.url;
    this.modalStore.hide();
    localStorage.setItem('url', this.url);
  };
}
