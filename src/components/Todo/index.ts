import { connect } from '../../utils/mobxConnect'
import { TodoStore, ITodoDependencies } from './Todo.store'
import Todo from './Todo.view'


export default connect<ITodoDependencies>({
    isGlobal: false,
    Store: TodoStore,
    dependencies: {
        syncCount: () => {}
    }
})(Todo)
