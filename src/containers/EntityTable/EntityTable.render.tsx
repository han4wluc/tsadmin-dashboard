

import { EntityTableStore } from './EntityTable.store'
import EntityListItem from './components/EntityListItem'


export default (s: EntityTableStore) => {
    return {
        renderEntity: (entity: any) => {
            const isSelected = !!s.currentEntity && (s.currentEntity.id === entity.id)
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
