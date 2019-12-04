import { observer } from 'mobx-react'

const connect = ({
    isGlobal,
    Store
}: any) => {
    return (Element: any) => {
        const OElement: any = observer(Element)
        return (props: any) => {
            const store = isGlobal ? Store.getInstance() : new Store()
            return (
                <OElement {...props} store={store} />
            )
        }
    }
}

export {
    connect
}
