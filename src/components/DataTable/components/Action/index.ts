
import { connect } from '../../../../utils/mobxConnect'
import { ActionStore, IActionDependencies } from './Action.store'
import Action from './Action.view'


export default connect<IActionDependencies>({
    isGlobal: false,
    Store: ActionStore,
    dependencies: {}
})(Action)

