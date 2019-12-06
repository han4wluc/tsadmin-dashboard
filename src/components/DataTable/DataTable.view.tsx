
import React from 'react'
import {Table,Modal} from 'antd'
import ItemForm from '../ItemForm'

const {
    Column
} = Table

function DataTable(props: any) {
    const {
        items,
        loading,
        columns,
        store: {
            visible,
            show,
            hide
        }
    } = props

    const columnsComp = columns.map((column: any) => {
        const {
            label
        } = column
        return (
            <Column
                key={label}
                title={label}
                dataIndex={label}
            />
        )
    })
    columnsComp.push(
        <Column
            key="actions"
            title="actions"
            dataIndex="actions"
            render={() => {
                const onSubmit = () => {

                }
                return (
                    <div>
                        <span onClick={show}>Edit{'  '}</span>
                        <span>Delete</span>
                        <Modal
                            title="edit"
                            visible={visible}
                            onCancel={hide}
                            width="60%"
                            footer={null}
                        >
                            <ItemForm
                                columns={columns}
                                onSubmit={onSubmit}
                            />
                        </Modal>
                    </div>
                )
            }}
        />
    )

    return (
        <div>
            <Table
                dataSource={items}
                rowKey="id"
                loading={loading}
                size="small"
            >
                {columnsComp}
            </Table>
            <style jsx>{`
                
            `}</style>
        </div>
    )
}

export default DataTable

