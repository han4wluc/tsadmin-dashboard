
import React from 'react'
import DataTable from '../../components/DataTable'
import TableList from '../../components/TableList'
import FlexView from 'react-flexview';

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
        <FlexView>
            <FlexView width="200px" >
                <TableList
                    entities={entities}
                    selectEntityId={selectEntityId}
                    selectedEntityId={selectedEntityId}
                    loading={entitiesLoading}
                />
            </FlexView>
            <DataTable
                items={items}
                loading={itemsLoading}
                columns={columns}
            />
        </FlexView>
    )
}

export default EntityTable

