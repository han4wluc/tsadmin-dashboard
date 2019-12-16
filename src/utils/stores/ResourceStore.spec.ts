
import { assert } from 'chai'
import 'mocha';

import ResourceStore from '~/stores/ResourceStore'

describe('ResourceStore', () => {

    type UserType = {
        id: number,
        name: string,
    };

    describe('ResourceStore#constructor', () => {
        it('should initiate with empty array', () => {
            const store = new ResourceStore()
            assert.deepEqual(store.items, [])
        })

        it('should initiate with passed value', () => {
            const items = [1, 2, 3]
            const store = new ResourceStore<number>(items)
            assert.deepEqual(store.items, items)
        })
    })

    describe('ResourceStore#append', () => {
        it('should append new item', () => {
            const store = new ResourceStore()
            store.append(1)
            assert.deepEqual(store.items, [1])
        })

        it('should not append duplicate item when allowDuplicate option is false', () => {
            const store = new ResourceStore([1])
            store.append(1)
            assert.deepEqual(store.items, [1])
        })

        it('should append duplicate item when allowDuplicate option is true', () => {
            const store = new ResourceStore([1])
            store.append(1, true)
            assert.deepEqual(store.items, [1, 1])
        })

        it('should filter duplicates with filter function', () => {
            const users: UserType[] = [{
                id: 0,
                name: 'me'
            }]
            const store = new ResourceStore<UserType>(users, (x) => x.id)
            store.append({
                id: 0,
                name: 'you'
            }, false)
            assert.deepEqual(store.items, [{
                id: 0,
                name: 'me'
            }])
        })
    })

    describe('ResourceStore#appendMultiple', () => {
        it('should append multiple items', () => {
            const store = new ResourceStore()
            store.appendMultiple([1, 2])
            assert.deepEqual(store.items, [1, 2])
        })

        it('should not append duplicate items when allowDuplicate option is false', () => {
            const store = new ResourceStore([1])
            store.appendMultiple([1, 1])
            assert.deepEqual(store.items, [1])
        })

        it('should append duplicate items when allowDuplicate option is true', () => {
            const store = new ResourceStore([1])
            store.appendMultiple([1, 1], true)
            assert.deepEqual(store.items, [1, 1, 1])
        })
    })

    describe('ResourceStore#remove', () => {
        it('should remove item', () => {
            const store = new ResourceStore([1, 2, 3])
            store.remove(2)
            assert.deepEqual(store.items, [1,3])
        })

        it('should remove item', () => {
            const users: UserType[] = [{
                id: 0,
                name: 'me'
            }, {
                id: 1,
                name: 'you'
            }]
            const store = new ResourceStore<UserType>(users, (x) => x.id)
            store.remove(0)
            assert.deepEqual(store.items, [{
                id: 1,
                name: 'you'
            }])
        })
    })
})
