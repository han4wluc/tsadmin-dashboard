
import React from 'react'
import {Button, Modal} from 'antd'
import DataTable from './components/DataTable'
import TableList from './components/TableList'
import ItemForm from './components/ItemForm'
import FlexView from 'react-flexview';

function EntityTable(props: any) {
    const {
        store: {
            entities,
            entitiesLoading,
            selectEntityId,
            selectedEntityId,
            deleteItem,
            currentEntity,
            items,
            itemsLoading,
            columns,
            modalVisible,
            showCreateModal,
            showUpdateModal,
            hideModal,
            createItemLoading,
            createItem,
            replaceOneItem,
            modalTitle,
            modalMode,
            onSubmitForm,
            currentEditItem
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
                    <Button type="primary" onClick={showCreateModal}>Create</Button>
                </FlexView>
                <DataTable
                    onClickEdit={showUpdateModal}
                    replaceOneItem={replaceOneItem}
                    entity={currentEntity}
                    items={items}
                    loading={itemsLoading}
                    columns={columns}
                    deleteItem={deleteItem}
                    onSubmitForm={onSubmitForm}
                />
            </FlexView>
            <Modal
                title={modalTitle}
                onCancel={hideModal}
                visible={modalVisible}
                width="60%"
                footer={null}
            >
                <ItemForm
                    columns={columns}
                    mode={modalMode}
                    item={currentEditItem}
                    loading={createItemLoading}
                    onSubmit={onSubmitForm}
                    okText={modalTitle}
                />
            </Modal>
        </FlexView>
    )
}

export default EntityTable

