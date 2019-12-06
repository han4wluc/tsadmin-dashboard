
import { connect } from '../../utils/mobxConnect'
import { DataTableStore, IDataTableDependencies } from './DataTable.store'
import DataTable from './DataTable.view'
import {counterService} from '../../services/api/CounterService'


export default connect<IDataTableDependencies>({
    isGlobal: false,
    Store: DataTableStore,
    dependencies: {
        syncCount: () => {},
        counterService: counterService
    }
})(DataTable)

