import React, {useMemo} from 'react'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

class TodoStore {
    instance = null

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new TodoStore()
        return this.instance
    }

    @observable count = 0
  
    @action increment = () => {
        this.count += 1
    }
  
    @action decrement = () => {
        this.count -= 1
    }
 }
  

function Todo(props) {
    const todoStore = useMemo(() => {
        return new TodoStore()
    }, [0])

    const { count, increment, decrement } = todoStore
    return (
        <div>
            <span>{count}</span>
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
            <style jsx>{`
                div {
                padding: 15px;
                color: #82fa58;
                display: inline-block;
                font: 50px menlo, monaco, monospace;
                background-color: #000;
                }

                .light {
                background-color: #999;
                }
            `}</style>
        </div>
    )
}

export default observer(Todo)
