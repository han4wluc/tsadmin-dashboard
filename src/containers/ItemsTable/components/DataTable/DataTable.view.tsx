import React from 'react';
import { Table, Tag } from 'antd';
import FlexView from 'react-flexview';

const { Column } = Table;

function DataTable(props: any): any {
  const { items, loading, columns, renderAction } = props;

  const columnsComp = columns.map((column: any) => {
    const { label, type } = column;
    return (
      <Column
        key={label}
        title={(): any => (
          <FlexView column>
            <span>{label}</span>
            <Tag>{type}</Tag>
          </FlexView>
        )}
        dataIndex={label}
      />
    );
  });
  columnsComp.push(
    <Column
      key="actions"
      title="actions"
      dataIndex="actions"
      width={100}
      render={renderAction}
    />,
  );

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
      <style jsx>{``}</style>
    </div>
  );
}

export default DataTable;
