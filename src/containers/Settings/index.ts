import mobxReactBind from 'mobx-react-bind';

import applicationStore from '~/globalStores/applicationStore';
import { entityService } from '~/services/api/EntityService';
import entityEmitter from '~/services/emitters/entityEmitter';

import { SettingsStore, ISettingsStoreDependencies } from './Settings.store';
import SettingsView from './Settings.container';

export default mobxReactBind<ISettingsStoreDependencies>({
  isGlobal: false,
  Store: SettingsStore,
  dependencies: {
    applicationStore,
    entityService,
    entityEmitter,
  },
})(SettingsView);
