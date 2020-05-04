import { AxiosInstance } from 'axios';
import tsAdminClient from './clients/tsAdminClient';

class EntityService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  setUrl = (url: string): void => {
    this.httpClient.defaults.baseURL = url;
  };

  setAuthToken = (token: string): void => {
    this.httpClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  authorize = async (url: string, authToken: string): Promise<any> => {
    if (!authToken) {
      const res = await this.httpClient.post(url + 'authorize', null, {
        headers: {
          Authorization: 'none',
        },
      });
      return res.data;
    }

    const res = await this.httpClient.post(url + 'authorize', null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  createItem = async (entityName: string, data: any): Promise<any> => {
    const res = await this.httpClient.post<any, any>(`${entityName}`, {
      data,
    });
    return res.data;
  };

  updateItem = async (entityName: string, id: any, data: any): Promise<any> => {
    const res = await this.httpClient.patch<any, any>(`${entityName}/${id}`, {
      data,
    });
    return res.data;
  };

  fetchEntities = async (): Promise<any> => {
    const reps = await this.httpClient.get<any, any>('entities');
    return reps.data;
  };

  fetchItems = async (entityName: string, config: any): Promise<any> => {
    const reps = await this.httpClient.get<any, any>(`${entityName}`, config);
    return reps.data;
  };

  deleteItem = async (entityName: string, id: any): Promise<any> => {
    const res = await this.httpClient.delete<any, any>(`${entityName}/${id}`);
    return res.data;
  };
}

const entityService = new EntityService(tsAdminClient);

export { entityService };

export default EntityService;
