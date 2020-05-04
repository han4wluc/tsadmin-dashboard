import React from 'react';
import { Modal } from 'antd';
import { SettingsStore } from './Settings.store';
import { SettingOutlined } from '@ant-design/icons';

import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import FlexView from 'react-flexview/lib';

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
      <FlexView vAlignContent="center">
        <div style={{ marginRight: 16 }}>{store.url}</div>
        <SettingOutlined
          onClick={() => {
            store.modalStore.show('');
          }}
        />
      </FlexView>
      <Modal
        title="Settings"
        visible={store.modalStore.visible}
        onCancel={() => {
          store.modalStore.hide();
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            url: store.url,
            token: '',
          }}
          onSubmit={store.submit}
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
    </div>
  );
}

export default Settings;
