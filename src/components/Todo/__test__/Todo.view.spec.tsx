


import React from 'react'
import 'mocha';
import { assert } from 'chai'
import TestRenderer from 'react-test-renderer';
import sinon from 'sinon'

import TodoView from '../Todo.view'

describe('Todo.view', () => {
    const increment = sinon.spy()
    const decrement = sinon.spy()

    const props = {
        store: {
            count: 0,
            increment,
            decrement
        }
    }
    const testRenderer = TestRenderer.create(
        <TodoView {...props} />
    );

    const instance = testRenderer.root

    it('should render count', () => {
        assert.deepEqual(instance.findByProps({className: "count"}).children, ['0'])
        instance.findByProps({className: "increment"}).props.onClick()
        assert.equal(increment.calledOnce, true)
        instance.findByProps({className: "decrement"}).props.onClick()
        assert.equal(decrement.calledOnce, true)
    })
})
