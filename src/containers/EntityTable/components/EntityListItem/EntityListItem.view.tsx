import { useCallback } from 'react'
import { List } from 'antd'

function EntityListItem(props: any) {
    const {
        entity,
        isSelected,
        selectEntityId,
    } = props

    const handleOnClick = useCallback(() => {
        selectEntityId(entity.id)
    }, [entity])

    return (
        <List.Item
            style={{
                color: isSelected ? 'red' : undefined
            }}
            key={entity.id}
            onClick={handleOnClick}
        >
            {entity.label}
        </List.Item>
    )
}

export default EntityListItem
