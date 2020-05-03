import mobxReactBind from 'mobx-react-bind';
import { SettingsStore, ISettingsStoreDependencies } from './Settings.store';
import SettingsView from './Settings.container';
import { entityService } from '~/services/api/EntityService';

export default mobxReactBind<ISettingsStoreDependencies>({
  isGlobal: false,
  Store: SettingsStore,
  dependencies: {
    entityService,
  },
})(SettingsView);
