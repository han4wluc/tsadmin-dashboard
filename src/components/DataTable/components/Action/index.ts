
import { connect } from '../../../../utils/mobxConnect'
import { ActionStore, IActionDependencies } from './Action.store'
import Action from './Action.view'
import {entityService} from '../../../../services/api/EntityService'

export default connect<IActionDependencies>({
    isGlobal: false,
    Store: ActionStore,
    dependencies: {
        entityService
    }
})(Action)

