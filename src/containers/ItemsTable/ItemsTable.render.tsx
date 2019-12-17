

import { ItemsTableStore } from './ItemsTable.store'
import Action from './components/Action'

export default (s: ItemsTableStore) => {
    return {
        renderAction: (_: any, item: any) => {
            return (
                <Action
                    item={item}
                    onClickEdit={s.showUpdateModal}
                    onClickDelete={s.deleteItem}
                />
            )
        }
    }
}
