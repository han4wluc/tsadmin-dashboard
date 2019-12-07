
import React from 'react'
import {Table,Modal, Tag} from 'antd'
import ItemForm from '../ItemForm'
import Action from './components/Action'
import FlexView from 'react-flexview';

const {
    Column
} = Table

function DataTable(props: any) {
    const {
        items,
        loading,
        columns,
    } = props

    const columnsComp = columns.map((column: any) => {
        const {
            label,
            type
        } = column
        return (
            <Column
                key={label}
                // title={label}
                title={() => (
                    <FlexView column>
                        <span>{label}</span>
                        <Tag>{type}</Tag>
                    </FlexView>
                )}
                dataIndex={label}
            />
        )
    })
    columnsComp.push(
        <Column
            key="actions"
            title="actions"
            dataIndex="actions"
            width={100}
            render={(_, item: any) => {
                const onSubmit = () => {

                }
                return (
                    <Action
                        item={item}
                        columns={columns}
                        onSubmit={onSubmit}
                    />
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

