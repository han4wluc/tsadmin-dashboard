
import React from 'react'
import {List} from 'antd'

function TableList(props: any) {
    const {
        entities,
        selectEntityId,
        selectedEntityId,
        loading
    } = props

    return (
        <List
            itemLayout="horizontal"
            dataSource={entities}
            loading={loading}
            renderItem={(entity: any) => {
                const isSelected = selectedEntityId === entity.id
                function handleOnClick() {
                    selectEntityId(entity.id)
                }
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
            )}}
        />
    )
}

export default TableList

