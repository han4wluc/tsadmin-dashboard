
import React from 'react'
import {
    Form,
    Input,
    Button,
    Tooltip,
    Icon,
    Select
} from 'antd';

const {
  Option
} = Select

function RegistrationForm(props: any) {  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  const { columns, item={} } = props

  console.warn('item', item.id, item.label)

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

  const formsComp = columns.map((column: any) => {
    const {
      label,
      type,
      enum: enums,
      required
    } = column
    const rules: any = []
    if (required) {
      rules.push(
        {
          required: true,
          message: 'Field is required',
        }
      )
    }
    let comp = <Input />
    if (type === 'enum') {
      const options = enums.map((e: string) => {
        return (
          <Option key={e} value={e}>{e}</Option>
        )
      })
      comp = (
        <Select>
          {options}
        </Select>
      )
    }
    return (
      <Form.Item key={label} label={(
        <span>
          <span style={{marginRight: 4}}>{label}</span>
          <Tooltip title={label}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      )}>
        {getFieldDecorator(label, {
          initialValue: item[label],
          rules
        })(comp)}
      </Form.Item> 
    )
  })

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      {formsComp}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create<any>({ name: 'register' })(RegistrationForm)
