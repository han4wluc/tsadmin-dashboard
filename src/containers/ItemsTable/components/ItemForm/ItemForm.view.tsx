import React from 'react';
import moment from 'moment';
import { Tooltip, Icon, Tag } from 'antd';
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
        <Icon type="question-circle-o" />
      </Tooltip>
    </span>
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
  const { type, options = {}, ...otherProps } = props;

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

  return <Input {...otherProps} />;
}

function ItemFormik(props: any): any {
  const { item = {}, onSubmit, mode, columns = [], loading, okText } = props;
  const filterColumns = createFilterColumnsFunction(mode);

  const initialValues = {
    ...item,
  };

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
                />
              </Form.Item>
            );
          });

        return (
          <Form layout="vertical" {...formItemLayout}>
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
