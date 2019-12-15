import { connect } from '~/utils/mobxConnect'
import { TodoStore, ITodoDependencies } from './Todo.store'
import Todo from './Todo.view'
import {counterService} from '~/services/api/CounterService'


export default connect<ITodoDependencies>({
    isGlobal: false,
    Store: TodoStore,
    dependencies: {
        syncCount: () => {},
        counterService: counterService
    }
})(Todo)
