import App from 'next/app'
import React from 'react'
import { fetchInitialStoreState, Store } from '../store'
import { TodoStore } from '../stores/TodoStore'
import { Provider } from 'mobx-react'

class MyMobxApp extends App {
  state = {
    store: new Store(),
    todoStore: new TodoStore()
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext: any) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()

    return {
      ...appProps,
      initialStoreState,
    }
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props: any, state: any) {
    state.store.hydrate(props.initialStoreState)
    return state
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={this.state.store} todoStore={this.state.todoStore} >
        <Component {...pageProps} />
      </Provider>
    )
  }
}
export default MyMobxApp
