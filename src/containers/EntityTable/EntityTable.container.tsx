
import React from 'react'
import {Button, Modal} from 'antd'
import DataTable from '../../components/DataTable'
import TableList from '../../components/TableList'
import ItemForm from '../../components/ItemForm'
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
            columns,
            modalVisible,
            showModal,
            hideModal
        }
    } = props

    return (
        <FlexView>
            <FlexView basis={200}>
                <TableList
                    entities={entities}
                    selectEntityId={selectEntityId}
                    selectedEntityId={selectedEntityId}
                    loading={entitiesLoading}
                />
            </FlexView>
            <FlexView column={true} grow>
                <FlexView hAlignContent="right" height="64px">
                    <Button type="primary" onClick={showModal}>Create</Button>
                </FlexView>
                <DataTable
                    items={items}
                    loading={itemsLoading}
                    columns={columns}
                />
            </FlexView>
            <Modal
                title={`Create`}
                onCancel={hideModal}
                visible={modalVisible}
                width="60%"
                footer={null}
            >
                <ItemForm
                    columns={columns}
                    mode="create"
                />
            </Modal>
        </FlexView>
    )
}

export default EntityTable

