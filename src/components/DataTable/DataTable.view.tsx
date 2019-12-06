
import React from 'react'
import {Table} from 'antd'

const {
    Column
} = Table

function DataTable(props: any) {
    const {
        items,
        loading,
        columns
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
                return (
                    <div>
                        <span>Edit{'  '}</span>
                        <span>Delete</span>
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

