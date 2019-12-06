
import React from 'react'
import {
    Form,
    Input,
    Button
} from 'antd';

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
  const { columns } = props

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
      value
    } = column
    return (
      <Form.Item label={label}>
        {getFieldDecorator(label, {
          initialValue: value
        })(<Input />)}
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
