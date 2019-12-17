import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react';

interface IConnectPramaters<T> {
  isGlobal: boolean;
  Store: any;
  dependencies: T;
  renderFunctions?: any;
}

function connect<T>({
  isGlobal,
  Store,
  dependencies,
  renderFunctions = (): void => {
    /** */
  },
}: IConnectPramaters<T>) {
  return (Element: any): any => {
    const ReturnComp = (props: any): any => {
      const OElement: any = observer(Element);
      const [store] = useState(
        isGlobal ? Store.getInstance(dependencies) : new Store(dependencies),
      );
      useEffect(() => {
        return store.mount();
      }, [store]);
      const renderFunctionProps = useMemo(() => {
        return renderFunctions(store);
      }, [store]);
      return <OElement {...props} {...renderFunctionProps} store={store} />;
    };
    ReturnComp.displayName = 'DisplayName';
    return ReturnComp;
  };
}

export interface IStoreDependencies {}

class BaseStore {
  static instance: BaseStore;

  constructor(protected dependencies: IStoreDependencies) {}

  static getInstance(dependencies: IStoreDependencies): BaseStore {
    if (!this.instance) {
      this.instance = new BaseStore(dependencies);
    }
    return this.instance;
  }

  mount(): void {
    //
  }
}

export { connect, BaseStore };
