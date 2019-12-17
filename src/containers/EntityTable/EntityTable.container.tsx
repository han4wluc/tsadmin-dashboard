
import React, { useCallback } from 'react'
import {List} from 'antd'
import FlexView from 'react-flexview';

import {EntityTableStore} from './EntityTable.store'

function EntityTable(props: {
    store: EntityTableStore,
    renderAction: any,
    renderEntity: any
}) {
    const {
        store: s,
        renderEntity
    } = props
    const _renderEntity = useCallback(renderEntity, [s.currentEntity])
    return (
        <FlexView basis={200}>
            <List
                itemLayout="horizontal"
                dataSource={s.entities}
                loading={s.entitiesLoading}
                renderItem={_renderEntity}
            />
        </FlexView>
    )
}

export default EntityTable

