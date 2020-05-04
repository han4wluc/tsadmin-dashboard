import mobxReactBind from 'mobx-react-bind';

import { entityService } from '~/services/api/EntityService';
import entityEmitter from '~/services/emitters/entityEmitter';

import { ItemsTableStore, IItemsTableDependencies } from './ItemsTable.store';
import EntityTable from './ItemsTable.container';

export default mobxReactBind<IItemsTableDependencies>({
  isGlobal: false,
  Store: ItemsTableStore,
  dependencies: {
    entityService,
    entityEmitter,
  },
})(EntityTable);
