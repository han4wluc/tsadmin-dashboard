
import { assert } from 'chai'
import 'mocha';

import {TodoStore} from '../Todo.store'

describe('Todo.store', () => {
    it('should have property count', () => {
        const todoStore = new TodoStore()
        assert.equal(todoStore.count, 0)
    })
    it('should increment by one', () => {
        const todoStore = new TodoStore()
        todoStore.increment()
        assert.equal(todoStore.count, 1)
    })
    it('should decrement by one', () => {
        const todoStore = new TodoStore()
        todoStore.decrement()
        assert.equal(todoStore.count, -1)
    })
})
