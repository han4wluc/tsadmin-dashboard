import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import FilterEditor from './FilterEditor.view';

export default {
  title: 'Components | FilterEditor',
};

export const normal = () => {
  return (
    <div>
      <FilterEditor
        columns={['aaa', 'bbb', 'ccc']}
        value={[
          {
            id: 'aaa',
            operator: 'eq',
            value: 'bbb',
          },
        ]}
        onChangeValue={action('onChangeValue')}
      />
    </div>
  );
};
