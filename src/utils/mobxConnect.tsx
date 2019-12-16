import React, {useEffect, useState, useMemo} from 'react'
import { observer } from 'mobx-react'


interface IConnectPramaters<T> {
    isGlobal: boolean,
    Store: any,
    dependencies: T,
    renderFunctions?: any
}

function connect<T>({
    isGlobal,
    Store,
    dependencies,
    renderFunctions = () => {}
}: IConnectPramaters<T>) {
    return (Element: any) => {
        return (props: any) => {
            const OElement: any = observer(Element)
            const [store] = useState(isGlobal ? Store.getInstance(dependencies) : new Store(dependencies))
            useEffect(() => {
                store.mount()
                return () => {
                    store.unmount()
                }
            }, [store])
            const renderFunctionProps = useMemo(() => {
                return renderFunctions(store)
            }, [store, renderFunctions])
            return (
                <OElement {...props} {...renderFunctionProps} store={store} />
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

    mount() {}
  
    unmount() {}
}

export {
    connect,
    BaseStore
}
