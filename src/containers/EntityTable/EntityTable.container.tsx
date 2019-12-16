
import React, { useCallback } from 'react'
import {Button, Modal} from 'antd'
import DataTable from './components/DataTable'
import TableList from './components/TableList'
import ItemForm from './components/ItemForm'
import Action from './components/Action'
import FlexView from 'react-flexview';

function EntityTable(props: any) {
    const {
        store: s
    } = props

    const renderAction = useCallback((_: any, item: any) => {
        return (
            <Action
                item={item}
                onClickEdit={s.showUpdateModal}
                onClickDelete={s.deleteItem}
            />
        )
    }, [s.showUpdateModal, s.deleteItem])

    return (
        <FlexView>
            <FlexView basis={200}>
                <TableList
                    entities={s.entities}
                    selectEntityId={s.selectEntityId}
                    selectedEntityId={s.selectedEntityId}
                    loading={s.entitiesLoading}
                />
            </FlexView>
            <FlexView column={true} grow>
                <FlexView hAlignContent="right" height="64px">
                    <Button type="primary" onClick={s.showCreateModal}>Create</Button>
                </FlexView>
                <DataTable
                    items={s.items}
                    loading={s.itemsLoading}
                    columns={s.columns}
                    deleteItem={s.deleteItem}
                    renderAction={renderAction}
                />
            </FlexView>
            <Modal
                title={s.modalTitle}
                onCancel={s.hideModal}
                visible={s.modalVisible}
                width="60%"
                footer={null}
            >
                <ItemForm
                    columns={s.columns}
                    mode={s.modalMode}
                    item={s.currentEditItem}
                    loading={s.createItemLoading}
                    onSubmit={s.onSubmitForm}
                    okText={s.modalTitle}
                />
            </Modal>
        </FlexView>
    )
}

export default EntityTable

