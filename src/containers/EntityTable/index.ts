import mobxReactBind from 'mobx-react-bind';
import { entityService } from '~/services/api/EntityService';
import entityEmitter from '~/services/emitters/entityEmitter';

import {
  EntityTableStore,
  IEntityTableDependencies,
} from './EntityTable.store';
import EntityTable from './EntityTable.container';

export default mobxReactBind<IEntityTableDependencies>({
  isGlobal: false,
  Store: EntityTableStore,
  dependencies: {
    entityService,
    entityEmitter,
  },
})(EntityTable);
