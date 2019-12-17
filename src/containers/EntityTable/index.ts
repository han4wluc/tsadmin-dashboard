import { entityService } from '~/services/api/EntityService';
import { connect } from '~/utils/mobxConnect';
import entityEmitter from '~/services/emitters/entityEmitter';

import {
  EntityTableStore,
  IEntityTableDependencies,
} from './EntityTable.store';
import EntityTable from './EntityTable.container';
import renderFunctions from './EntityTable.render';

export default connect<IEntityTableDependencies>({
  isGlobal: false,
  Store: EntityTableStore,
  dependencies: {
    entityService,
    entityEmitter,
  },
  renderFunctions,
})(EntityTable);
