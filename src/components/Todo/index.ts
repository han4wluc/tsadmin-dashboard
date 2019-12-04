import { connect } from '../../utils/mobxConnect'
import { TodoStore } from './Todo.store'
import Todo from './Todo.view'

export default connect({
    isGlobal: false,
    Store: TodoStore
})(Todo)
