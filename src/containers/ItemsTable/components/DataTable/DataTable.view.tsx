import React from 'react';
import { Table, Tag, Popover } from 'antd';
import FlexView from 'react-flexview';

const { Column } = Table;

function DataTable(props: any): any {
  const { items, loading, columns, renderAction, pageInfo, fetchData } = props;

  const columnsComp = columns.map((column: any) => {
    const { id, label, type, options, fixed } = column;
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
          <Popover content={content} trigger="hover" placement="top">
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

    if (type === 'model') {
      // eslint-disable-next-line react/display-name
      render = (value: any) => {
        const { label, nameAttribute } = options;
        if (!value) {
          return null;
        }
        const content = (
          <div
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(value, null, 2)}
          </div>
        );
        return (
          <Popover content={content} trigger="hover" placement="top">
            <div>{`${label}{${value[nameAttribute]}}`}</div>
          </Popover>
        );
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
        width={150}
        fixed={fixed}
        dataIndex={id}
        render={render}
      />
    );
  });

  if (!loading) {
    columnsComp.push(
      <Column
        key="actions"
        title="Actions"
        dataIndex="actions"
        width={150}
        fixed={'right'}
        render={renderAction}
      />,
    );
  }

  return (
    <Table
      scroll={{ x: 150 * columns.length + 150 }}
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
  );
}

export default DataTable;
