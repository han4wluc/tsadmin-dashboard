import mobxReactBind from 'mobx-react-bind';
import entitiesStore from '~/globalStores/entitiesStore';

import {
  EntityTableStore,
  IEntityTableDependencies,
} from './EntityTable.store';
import EntityTable from './EntityTable.container';

export default mobxReactBind<IEntityTableDependencies>({
  isGlobal: false,
  Store: EntityTableStore,
  dependencies: {
    entitiesStore,
  },
})(EntityTable);
