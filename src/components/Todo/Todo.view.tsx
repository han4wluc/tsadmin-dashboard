
import React from 'react'

function Todo(props: any) {
    const { store } = props
    const { count, increment, decrement } = store
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

export default Todo

