
import React from 'react'
import {Table, Tag} from 'antd'
import Action from './components/Action'
import FlexView from 'react-flexview';

const {
    Column
} = Table

function DataTable(props: any) {
    const {
        replaceOneItem,
        entity,
        items,
        loading,
        columns,
        deleteItem,
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
                        deleteItem={deleteItem}
                        replaceOneItem={replaceOneItem}
                        entity={entity}
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
                bordered={true}
            >
                {columnsComp}
            </Table>
            <style jsx>{`
                
            `}</style>
        </div>
    )
}

export default DataTable

