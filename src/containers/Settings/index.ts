import { connect } from '~/utils/mobxConnect';

import { SettingsStore, ISettingsStoreDependencies } from './Settings.store';
import SettingsView from './Settings.container';
import tsAdminClient from '~/services/api/clients/tsAdminClient';

export default connect<ISettingsStoreDependencies>({
  isGlobal: false,
  Store: SettingsStore,
  dependencies: {
    tsAdminClient,
  },
})(SettingsView);
