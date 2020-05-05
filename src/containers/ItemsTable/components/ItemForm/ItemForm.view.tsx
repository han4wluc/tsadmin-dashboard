import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import tsAdminClient from '~/services/api/clients/tsAdminClient';
import { uniqBy } from 'lodash';
import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  SubmitButton,
  DatePicker,
  Select,
} from 'formik-antd';
import { Formik } from 'formik';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

function Label(props: any): any {
  const { label, type } = props;
  return (
    <span>
      <span style={{ marginRight: 4 }}>{label}</span>
      <Tag>{type}</Tag>
      <Tooltip title={label}>
        <QuestionCircleOutlined />
      </Tooltip>
    </span>
  );
}

function ModelInput(props: any) {
  const { id, label, nameAttribute, data } = props;
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchItems() {
      const { data } = await tsAdminClient.get(`${id}`);
      setItems(data.items);
    }
    fetchItems();
  }, [id]);

  const options = uniqBy((data[id] || []).concat(items), 'id');

  return (
    <Select
      name={id}
      filterOption={false}
      showSearch={true}
      onSearch={async (val: string) => {
        if (!val || val === '') {
          const { data } = await tsAdminClient.get(`${id}`);
          setItems(data.items);
          return;
        }
        const { data } = await tsAdminClient.get(`${id}`, {
          params: {
            filter: `and(${nameAttribute}:eq:${val})`,
          },
        });
        setItems(data.items);
      }}
    >
      {options.map((item: any) => {
        return (
          <Select.Option
            key={item.id}
            value={item.id}
          >{`${label}{${item[nameAttribute]}}`}</Select.Option>
        );
      })}
    </Select>
  );
}

function getIfDisabled(
  mode: string,
  loading: boolean,
  create: any,
  update: any,
): any {
  if (loading) {
    return true;
  }
  let disabled = false;
  if (mode === 'create' && create.editable === false) {
    disabled = true;
  }
  if (mode === 'update' && update.editable === false) {
    disabled = true;
  }
  return disabled;
}

function getDefaultValue(mode: string, create: any, update: any): any {
  if (mode === 'create') {
    if (create && create.default !== undefined) {
      return create.default;
    }
  }
  if (mode === 'update') {
    if (update && update.default !== undefined) {
      return update.default;
    }
  }
  return undefined;
}

function createFilterColumnsFunction(mode: string) {
  return (column: any): boolean => {
    if (mode === 'create') {
      return column.create && column.create.display === true;
    }
    if (mode === 'update') {
      return column.update && column.update.display === true;
    }
    return true;
  };
}

function TypeInput(props: any): any {
  const { type, options = {}, data, ...otherProps } = props;

  if (type === 'enum') {
    const { enumObject } = options;
    const optionsComp = Object.keys(enumObject).map(
      (label: string, i: number) => {
        const value = enumObject[label];
        return (
          <Select.Option key={i} value={value}>
            {label}
          </Select.Option>
        );
      },
    );
    // FIXME defaultValue not working
    return <Select {...otherProps}>{optionsComp}</Select>;
  }

  if (type === 'number') {
    const { max, min } = options;
    return (
      <InputNumber {...otherProps} max={max} min={min} style={{ width: 300 }} />
    );
  }

  if (type === 'boolean') {
    return (
      <Checkbox defaultChecked={otherProps.defaultValue} {...otherProps} />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker
        {...otherProps}
        defaultValue={moment(otherProps.defaultValue)}
      />
    );
  }

  if (type === 'datetime') {
    return (
      <DatePicker
        {...otherProps}
        showTime={true}
        defaultValue={moment(otherProps.defaultValue)}
      />
    );
  }

  if (type === 'text') {
    return <TextArea {...otherProps} />;
  }

  if (type === 'json') {
    const { rows } = options;
    const defaultValue = otherProps.defaultValue
      ? JSON.stringify(otherProps.defaultValue, null, 2)
      : undefined;
    return <TextArea rows={rows} {...otherProps} defaultValue={defaultValue} />;
  }

  if (type === 'model') {
    return <ModelInput {...options} data={data} />;
  }

  return <Input {...otherProps} />;
}

function ItemFormik(props: any): any {
  const [data, setData] = useState({});

  const { item = {}, onSubmit, mode, columns = [], loading, okText } = props;

  const initialValues = useMemo(() => {
    return item;
  }, [item]);

  useEffect(() => {
    async function fetchItems(id: string, nameAttribute: string) {
      if (initialValues[id] === undefined) {
        return;
      }
      if (typeof initialValues[id] === 'object') {
        return;
      }
      const { data: newItem } = await tsAdminClient.get(
        `${id}/${initialValues[id]}`,
      );
      setData((d: any) => {
        return {
          ...d,
          [id]: [newItem],
        };
      });
    }

    columns.forEach((column: any) => {
      if (column.type === 'model') {
        fetchItems(column.options.id, column.options.nameAttribute);
      }
    });
  }, [columns, initialValues]);
  const filterColumns = createFilterColumnsFunction(mode);

  columns.filter(filterColumns).forEach((column: any) => {
    const { id, type, create, update } = column;
    const disabled = getIfDisabled(mode, loading, create, update);
    if (disabled === true) {
      return;
    }
    if (type === 'json') {
      initialValues[id] = JSON.stringify(initialValues[id], null, 2);
    }
    if (type === 'enum') {
      const defaultValue = getDefaultValue(mode, create, update);
      if (defaultValue) {
        initialValues[id] = defaultValue;
      }
    }
    if (type === 'model') {
      if (initialValues[id]) {
        initialValues[id] = initialValues[id].id;
      }
    }
  });

  const _onSubmit = (values: any): any => {
    const finalValues: any = {};

    columns.filter(filterColumns).forEach((column: any) => {
      const { id, type, create, update } = column;
      const disabled = getIfDisabled(mode, loading, create, update);
      if (disabled === true) {
        return;
      }
      if (type === 'date') {
        finalValues[id] = values[id]
          ? moment(values[id]).format('YYYY-MM-DD')
          : undefined;
      } else if (type === 'datetime') {
        finalValues[id] = values[id] ? JSON.stringify(values[id]) : undefined;
      } else if (type === 'json') {
        finalValues[id] = values[id] ? JSON.parse(values[id]) : undefined;
      } else if (type === 'model') {
        finalValues[id] = {
          id: values[id],
        };
      } else if (type === 'boolean') {
        finalValues[id] = !!values[id];
      } else {
        finalValues[id] = values[id];
      }
    });

    console.log('Received values of form: ', finalValues);
    onSubmit && onSubmit(finalValues);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={_onSubmit}>
      {(): any => {
        const formItemsComp = columns
          .filter(filterColumns)
          .map((column: any) => {
            const { id, label, type, create, update, options } = column;
            const disabled = getIfDisabled(mode, loading, create, update);
            const defaultValue = getDefaultValue(mode, create, update);
            return (
              <Form.Item
                key={id}
                name={id}
                label={<Label label={label} type={type} />}
              >
                <TypeInput
                  name={id}
                  type={type}
                  disabled={disabled}
                  options={options}
                  defaultValue={defaultValue}
                  data={data}
                />
              </Form.Item>
            );
          });

        return (
          <Form {...formItemLayout}>
            {formItemsComp}
            <Form.Item name="_" {...tailFormItemLayout}>
              <SubmitButton loading={loading} disabled={false}>
                {okText}
              </SubmitButton>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ItemFormik;
