

import {entityService} from '~/services/api/EntityService'
import { connect } from '~/utils/mobxConnect'

import { EntityTableStore, IEntityTableDependencies } from './EntityTable.store'
import EntityTable from './EntityTable.container'

export default connect<IEntityTableDependencies>({
    isGlobal: false,
    Store: EntityTableStore,
    dependencies: {
        entityService
    }
})(EntityTable)

