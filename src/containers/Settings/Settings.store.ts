import { ApplicationStore } from '~/globalStores/applicationStore';

export interface ISettingsStoreDependencies {
  applicationStore: ApplicationStore;
}
export class SettingsStore {
  private applicationStore: ApplicationStore;

  constructor(protected dependencies: ISettingsStoreDependencies) {
    this.applicationStore = dependencies.applicationStore;
  }

  get url(): string {
    return this.applicationStore.url;
  }
  show = (): void => {
    this.applicationStore.modalStore.show('');
  };
}
