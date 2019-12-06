
import React from 'react'
import {Spin} from 'antd'

function TableList(props: any) {
    const {
        entities,
        selectEntityId,
        selectedEntityId,
        loading
    } = props

    const entityComps = entities.map((entity: any) => {
        function handleOnClick() {
            selectEntityId(entity.id)
        }
        const isSelected = selectedEntityId === entity.id
        return (
            <div style={{
                color: isSelected ? 'red' : undefined
            }} key={entity.id} onClick={handleOnClick}>
                {entity.label}
            </div>
        )
    })

    return (
        <div>
            <Spin spinning={loading}>
                {entityComps}
            </Spin>
            <style jsx>{`
                
            `}</style>
        </div>
    )
}

export default TableList

