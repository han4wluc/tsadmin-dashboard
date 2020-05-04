import { ModalStore } from 'mobx-react-bind';
import { action, observable } from 'mobx';
import EntityService, { entityService } from '~/services/api/EntityService';

export class ApplicationStore {
  public modalStore: ModalStore<any>;

  constructor(public entityService: EntityService) {
    this.modalStore = new ModalStore<any>();
  }

  @observable url = '';
  @observable isLoading = true;
  @observable serverIsConfigured = false;

  @action setLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };

  @action setServerIsConfigured = (serverIsConfigured: boolean): void => {
    this.serverIsConfigured = serverIsConfigured;
  };

  @action setUrl = (url: string): void => {
    this.url = url;
  };
}

export default new ApplicationStore(entityService);
