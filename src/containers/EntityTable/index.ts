

import { connect } from '../../utils/mobxConnect'
import { EntityTableStore, IEntityTableDependencies } from './EntityTable.store'
import EntityTable from './EntityTable.container'
import {counterService} from '../../services/api/CounterService'


export default connect<IEntityTableDependencies>({
    isGlobal: false,
    Store: EntityTableStore,
    dependencies: {
        syncCount: () => {},
        counterService: counterService
    }
})(EntityTable)

