import { entityService } from '~/services/api/EntityService';
import { connect } from '~/utils/mobxConnect';
import entityEmitter from '~/services/emitters/entityEmitter';

import { ItemsTableStore, IItemsTableDependencies } from './ItemsTable.store';
import EntityTable from './ItemsTable.container';
import renderFunctions from './ItemsTable.render';

export default connect<IItemsTableDependencies>({
  isGlobal: false,
  Store: ItemsTableStore,
  dependencies: {
    entityService,
    entityEmitter,
  },
  renderFunctions,
})(EntityTable);
