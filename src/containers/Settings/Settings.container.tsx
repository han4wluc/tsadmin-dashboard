import React from 'react';
import { Modal } from 'antd';
import { SettingsStore } from './Settings.store';

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

function Settings(props: { store: SettingsStore }) {
  const { store } = props;
  return (
    <div>
      <div onClick={store.modalStore.show.bind(store.modalStore)}>Settings</div>
      <Modal
        title="Settings"
        visible={store.modalStore.visible}
        onCancel={store.modalStore.hide.bind(store.modalStore)}
        footer={null}
      >
        <Formik
          initialValues={{
            url: store.url,
            token: '',
          }}
          onSubmit={store.submit}
        >
          <Form layout="vertical" {...formItemLayout}>
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
    </div>
  );
}

export default Settings;
