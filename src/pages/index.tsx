import React from 'react'
import Todo from '../components/Todo'

import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

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
