import React from 'react';
import { Modal } from 'antd';

import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';

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

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: any;
  url: string;
};

export default function ServerConfigurationModal(
  props: Props,
): React.FunctionComponentElement<Props> {
  const { visible, url, onCancel, onSubmit } = props;
  return (
    <Modal title="Settings" visible={visible} onCancel={onCancel} footer={null}>
      <Formik
        initialValues={{
          url: url,
          token: '',
        }}
        onSubmit={onSubmit}
      >
        <Form {...formItemLayout}>
          <Form.Item key="url" name="url" label="Url">
            <Input name="url" />
          </Form.Item>
          <Form.Item key="authToken" name="authToken" label="Auth Token">
            <Input name="authToken" />
          </Form.Item>
          <Form.Item name="_" {...tailFormItemLayout}>
            <SubmitButton disabled={false}>OK</SubmitButton>
          </Form.Item>
        </Form>
      </Formik>
    </Modal>
  );
}
