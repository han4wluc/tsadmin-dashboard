import React from 'react';
import { Table, Tag, Popover } from 'antd';
import FlexView from 'react-flexview';

const { Column } = Table;

function DataTable(props: any): any {
  const { items, loading, columns, renderAction, pageInfo, fetchData } = props;

  const columnsComp = columns.map((column: any) => {
    const { id, label, type, options } = column;
    let render = undefined;
    if (type === 'boolean') {
      render = (value: boolean) => {
        return String(value);
      };
    }
    if (type === 'json') {
      // eslint-disable-next-line react/display-name
      render = (value: object) => {
        const content = <div>{JSON.stringify(value, null, 2)}</div>;
        return (
          <Popover content={content} trigger="hover" placement="left">
            <div>...</div>
          </Popover>
        );
      };
    }
    if (type === 'enum') {
      const { enumObject } = options;
      const valueObject: any = {};

      Object.keys(enumObject).forEach((key: string) => {
        valueObject[enumObject[key]] = key;
      });
      render = (value: string): any => {
        return valueObject[value];
      };
    }
    return (
      <Column
        key={label}
        title={(): any => (
          <FlexView column>
            <span>{label}</span>
            <Tag>{type}</Tag>
          </FlexView>
        )}
        dataIndex={id}
        render={render}
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
        pagination={{
          onChange: (pageNum: number): any => {
            fetchData(pageNum);
          },
          ...pageInfo,
        }}
      >
        {columnsComp}
      </Table>
      <style jsx>{``}</style>
    </div>
  );
}

export default DataTable;
