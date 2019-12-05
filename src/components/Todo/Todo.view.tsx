
import React from 'react'

function Todo(props: any) {
    const {
        store: {
            count,
            increment,
            decrement
        }
    } = props
    return (
        <div>
            <span className="count">{count}</span>
            <button className="increment" onClick={increment}>increment</button>
            <button className="decrement" onClick={decrement}>decrement</button>
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

