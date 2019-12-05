import React from 'react'
import Todo from '../components/Todo'
import Clock from '../components/Clock'

import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export default class Counter extends React.Component<any, any> {

  componentWillMount() {
    this.setState({
      show: true
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: false
      })
    }, 3000)
  }

  render() {
    return (
        <div>
            <Todo ></Todo>
            <Clock />
            { this.state.show && <Todo></Todo> }
        </div>
    )
  }
}
