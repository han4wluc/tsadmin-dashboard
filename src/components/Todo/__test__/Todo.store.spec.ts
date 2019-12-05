
import { assert } from 'chai'
import 'mocha';

import {TodoStore} from '../Todo.store'
import {counterService} from '../../../services/api/CounterService'

describe('Todo.store', () => {

    let todoStore: TodoStore

    beforeEach(() => {
        todoStore = new TodoStore({
            syncCount: () => {},
            counterService
        })
    })

    it('should have property count', () => {
        assert.equal(todoStore.count, 0)
    })

    it('should increment by one', () => {
        todoStore.increment()
        assert.equal(todoStore.count, 1)
    })

    it('should decrement by one', () => {
        todoStore.decrement()
        assert.equal(todoStore.count, -1)
    })
})
