import FlexView from 'react-flexview';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';

import { SettingsStore } from './Settings.store';

function Settings(props: {
  store: SettingsStore;
}): React.FunctionComponentElement<any> {
  const { store } = props;
  return (
    <div>
      <FlexView vAlignContent="center">
        <div style={{ marginRight: 16 }}>{store.url}</div>
        <SettingOutlined
          onClick={() => {
            store.show();
          }}
        />
      </FlexView>
    </div>
  );
}

export default Settings;
