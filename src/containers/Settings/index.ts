import { connect } from '~/utils/mobxConnect';

import { SettingsStore, ISettingsStoreDependencies } from './Settings.store';
import SettingsView from './Settings.container';
import { entityService } from '~/services/api/EntityService';

export default connect<ISettingsStoreDependencies>({
  isGlobal: false,
  Store: SettingsStore,
  dependencies: {
    entityService,
  },
})(SettingsView);
