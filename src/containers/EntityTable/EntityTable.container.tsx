
import React, { useCallback } from 'react'
import {Button, Modal, List} from 'antd'
import FlexView from 'react-flexview';

import {EntityTableStore} from './EntityTable.store'
import DataTable from './components/DataTable'
import ItemForm from './components/ItemForm'

function EntityTable(props: {
    store: EntityTableStore,
    renderAction: any,
    renderEntity: any
}) {
    const {
        store: s,
        renderAction,
        renderEntity
    } = props

    return (
        <FlexView>
            <FlexView basis={200}>
                <List
                    itemLayout="horizontal"
                    dataSource={s.entities}
                    loading={s.entitiesLoading}
                    renderItem={renderEntity}
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

