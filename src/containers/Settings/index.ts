import mobxReactBind from 'mobx-react-bind';
import { SettingsStore, ISettingsStoreDependencies } from './Settings.store';
import SettingsView from './Settings.container';
import applicationStore from '~/globalStores/applicationStore';

export default mobxReactBind<ISettingsStoreDependencies>({
  isGlobal: false,
  Store: SettingsStore,
  dependencies: {
    applicationStore,
  },
})(SettingsView);
