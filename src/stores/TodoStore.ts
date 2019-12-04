
import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export class TodoStore {
  @observable count = 0

  @action increment = () => {
      this.count += 1
  }

  @action decrement = () => {
      this.count -= 1
  }
}
