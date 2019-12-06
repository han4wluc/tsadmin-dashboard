
import React from 'react'
import DataTable from '../../components/DataTable'
import TableList from '../../components/TableList'

function EntityTable(props: any) {
    const {
        store: {
            entities,
            entitiesLoading,
            selectEntityId,
            selectedEntityId,
            items,
            itemsLoading,
            columns
        }
    } = props

    return (
        <div>
            <TableList
                entities={entities}
                selectEntityId={selectEntityId}
                selectedEntityId={selectedEntityId}
                loading={entitiesLoading}
            />
            <DataTable
                items={items}
                loading={itemsLoading}
                columns={columns}
            />
        </div>
    )
}

export default EntityTable

