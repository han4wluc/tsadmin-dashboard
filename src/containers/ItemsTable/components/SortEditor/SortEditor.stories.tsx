import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import SortEditor from './index';

export default {
  title: 'Components | SortEditor',
};

export const normal = () => {
  return (
    <div>
      <SortEditor
        columns={['aaa', 'bbb', 'ccc']}
        value={[
          {
            id: 'aaa',
            operator: 'asc',
          },
        ]}
        onChangeValue={action('onChangeValue')}
        dependencies={{
          localValue: [],
        }}
      />
    </div>
  );
};
