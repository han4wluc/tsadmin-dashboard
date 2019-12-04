import React from 'react'
import Todo from '../components/Todo'

export default class Counter extends React.Component {
  render() {
    return (
        <div>
            <Todo></Todo>
            <Todo></Todo>
        </div>
    )
  }
}
