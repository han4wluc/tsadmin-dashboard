import React from 'react';
import { Tag, Button, Modal, Select, Form } from 'antd';
import FlexView from 'react-flexview';

const { Option } = Select;

const convertToString = (arr: any) => {
  return arr
    .map((obj: any) => {
      return `${obj.id}:${obj.operator}`;
    })
    .join(',');
};

function SortEditor(props: any): any {
  const { store: s, value = [], onChangeValue, columns } = props;

  const comps = s.localValue.map(
    (
      {
        id,
        operator,
        value,
      }: {
        id: any;
        operator: any;
        value: any;
      },
      i: number,
    ) => {
      return (
        <FlexView key={i} marginBottom={8} vAlignContent="center">
          <Select
            value={id}
            onChange={(val: string) => {
              s.updateId(i, val);
            }}
            style={{ width: 200 }}
          >
            {columns.map((column: any) => {
              return (
                <Option key={column} value={column}>
                  {column}
                </Option>
              );
            })}
          </Select>
          <div style={{ width: 16 }} />
          <Select
            value={operator}
            style={{ width: 100 }}
            onChange={(val: string) => {
              s.updateOperator(i, val);
            }}
          >
            <Option value="asc">asc</Option>
            <Option value="desc">desc</Option>
          </Select>
          <div style={{ width: 16 }} />
          <Button
            onClick={() => {
              s.delete(i);
            }}
            size="small"
          >
            -
          </Button>
        </FlexView>
      );
    },
  );

  return (
    <div>
      <Form layout="inline">
        <Form.Item label={<a onClick={s.showEditModal}>Sort</a>}>
          <Tag>{convertToString(value)}</Tag>
        </Form.Item>
      </Form>
      <Modal
        width="70%"
        visible={s.editModalVisible}
        title="Sort"
        onCancel={s.hideEditModal}
        onOk={() => {
          s.hideEditModal();
          onChangeValue(s.localValue, convertToString(s.localValue));
        }}
      >
        {comps}
        <Button onClick={s.onClickAdd} size="small">
          +
        </Button>
      </Modal>
    </div>
  );
}

export default SortEditor;
