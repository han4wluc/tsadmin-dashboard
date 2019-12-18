import React from 'react';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
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
    sm: { span: 8 },
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
      offset: 8,
    },
  },
};

function Label(props: any): any {
  const { label } = props;
  return (
    <span>
      <span style={{ marginRight: 4 }}>{label}</span>
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
  const { type, enums, ...otherProps } = props;

  if (type === 'enum') {
    const options = enums.map((e: string) => {
      return (
        <Select.Option key={e} value={e}>
          {e}
        </Select.Option>
      );
    });
    return <Select {...otherProps}>{options}</Select>;
  }

  if (type === 'number') {
    return <InputNumber style={{ width: 300 }} {...otherProps} />;
  }

  if (type === 'boolean') {
    return <Checkbox {...otherProps} />;
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
        defaultValue={moment(otherProps.defaultValue)}
      />
    );
  }

  if (type === 'text') {
    return <TextArea {...otherProps} />;
  }

  if (type === 'json') {
    const defaultValue = otherProps.defaultValue
      ? JSON.stringify(otherProps.defaultValue, null, 2)
      : undefined;
    return <TextArea {...otherProps} defaultValue={defaultValue} />;
  }

  return <Input {...otherProps} />;
}

function ItemFormik(props: any): any {
  const { item = {}, onSubmit, mode, columns = [], loading, okText } = props;
  const filterColumns = createFilterColumnsFunction(mode);
  return (
    <Formik
      initialValues={item}
      onSubmit={(values): any => {
        const finalValues: any = {};

        columns.filter(filterColumns).forEach((column: any) => {
          const { label, type, create, update } = column;
          const disabled = getIfDisabled(mode, loading, create, update);
          if (disabled === true) {
            return;
          }
          if (type === 'date') {
            finalValues[label] = values[label]
              ? values[label].format('YYYY-MM-DD')
              : undefined;
          } else if (type === 'datetime') {
            finalValues[label] = values[label]
              ? JSON.stringify(values[label])
              : undefined;
          } else if (type === 'json') {
            finalValues[label] = values[label]
              ? JSON.parse(values[label])
              : undefined;
          } else {
            finalValues[label] = values[label];
          }
        });

        console.log('Received values of form: ', finalValues);
        onSubmit && onSubmit(finalValues);
      }}
    >
      {(): any => {
        const formItemsComp = columns
          .filter(filterColumns)
          .map((column: any) => {
            const { label, type, create, update } = column;
            const disabled = getIfDisabled(mode, loading, create, update);
            const defaultValue = getDefaultValue(mode, create, update);
            return (
              <Form.Item
                key={label}
                name={label}
                label={<Label label={label} />}
              >
                <TypeInput
                  name={label}
                  type={type}
                  disabled={disabled}
                  defaultValue={defaultValue}
                />
              </Form.Item>
            );
          });

        return (
          <Form layout="vertical" {...formItemLayout}>
            {formItemsComp}
            <Form.Item name="_" {...tailFormItemLayout}>
              <SubmitButton loading={false} disabled={false}>
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
