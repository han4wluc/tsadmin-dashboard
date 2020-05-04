import FlexView from 'react-flexview';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';

import { SettingsStore } from './Settings.store';
import ServerConfigurationModal from './components/ServerConfigurationModal';

function Settings(props: {
  store: SettingsStore;
}): React.FunctionComponentElement<any> {
  const { store } = props;
  return (
    <FlexView vAlignContent="center">
      <div style={{ marginRight: 16 }}>{store.url}</div>
      <SettingOutlined
        onClick={(): void => {
          store.show();
        }}
      />
      <ServerConfigurationModal
        visible={store.visible}
        url={store.url}
        onSubmit={store.submit}
        onCancel={store.hide}
      />
    </FlexView>
  );
}

export default Settings;
