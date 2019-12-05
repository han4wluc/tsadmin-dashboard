import React, {useEffect, useState} from 'react'
import { observer } from 'mobx-react'


interface IConnectPramaters<T> {
    isGlobal: boolean,
    Store: any,
    dependencies: T
}

function connect<T>({
    isGlobal,
    Store,
    dependencies
}: IConnectPramaters<T>) {
    return (Element: any) => {
        return (props: any) => {
            const OElement: any = observer(Element)
            const [store] = useState(isGlobal ? Store.getInstance(dependencies) : new Store(dependencies))
            useEffect(() => {
                return () => {
                    store.unmount()
                }
            }, [store])
            return (
                <OElement {...props} store={store} />
            )
        }
    }
}


export interface IStoreDependencies {}

class BaseStore {
    static instance: BaseStore

    constructor(
        protected dependencies: IStoreDependencies
      ) {}

    static getInstance(dependencies: IStoreDependencies) {
      if (!this.instance) {
        this.instance = new BaseStore(dependencies)
      }
      return this.instance
    }
  
    unmount() {}
}

export {
    connect,
    BaseStore
}
