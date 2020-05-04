import { ModalStore } from 'mobx-react-bind';
import { action, observable } from 'mobx';
import EntityService, { entityService } from '~/services/api/EntityService';
import { message } from 'antd';

function addTrailingSlash(url: string): string {
  if (url[url.length - 1] === '/') {
    return url;
  }
  return url + '/';
}

export class ApplicationStore {
  public modalStore: ModalStore<any>;

  constructor(public entityService: EntityService) {
    this.modalStore = new ModalStore<any>();
  }

  @observable url = '';
  @observable isLoading = true;
  @observable serverIsConfigured = false;

  @action
  checkServerConfiguration = async (): Promise<boolean> => {
    const url = localStorage.getItem('url');
    const authToken = localStorage.getItem('authToken') || '';

    let authenticated = false;

    this.url = url || '';

    if (url) {
      const data = await this.entityService.authorize(url, authToken);
      if (!data.success) {
        this.isLoading = false;
        this.serverIsConfigured = false;
        return authenticated;
      }
      authenticated = true;

      this.entityService.setUrl(url);
      if (authToken) {
        this.entityService.setAuthToken(authToken);
      }

      this.isLoading = false;
      this.serverIsConfigured = true;

      return authenticated;
    } else {
      this.isLoading = false;
      this.serverIsConfigured = false;
      return authenticated;
    }
  };

  @action
  submit = async (values: any): Promise<boolean> => {
    const { url, authToken } = values;
    const urlWithSlash = addTrailingSlash(url);

    const data = await this.entityService.authorize(urlWithSlash, authToken);
    if (!data.success) {
      throw new Error('Invalid url');
    }

    this.url = urlWithSlash;
    this.entityService.setUrl(urlWithSlash);
    this.entityService.setAuthToken(authToken);

    localStorage.setItem('url', urlWithSlash);
    localStorage.setItem('authToken', values.authToken);

    this.serverIsConfigured = true;
    this.isLoading = false;
    return true;
  };
}

export default new ApplicationStore(entityService);
