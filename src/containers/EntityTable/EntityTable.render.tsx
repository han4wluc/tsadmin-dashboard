

import { EntityTableStore } from './EntityTable.store'
import Action from './components/Action'
import EntityListItem from './components/EntityListItem'

export default (s: EntityTableStore) => {
    return {
        renderAction: (_: any, item: any) => {
            return (
                <Action
                    item={item}
                    onClickEdit={s.showUpdateModal}
                    onClickDelete={s.deleteItem}
                />
            )
        },
        renderEntity:(entity: any) => {
            const isSelected = s.currentEntity && (s.currentEntity.id === entity.id)
            return (
                <EntityListItem
                    entity={entity}
                    isSelected={isSelected}
                    selectEntityId={s.selectEntityId}
                />
            )
        }
    }
}
