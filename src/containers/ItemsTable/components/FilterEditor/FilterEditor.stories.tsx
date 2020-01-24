import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterEditor from './index';

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
        dependencies={{
          localValue: [
            {
              id: 'aaa',
              operator: 'eq',
              value: 'bbb',
            },
          ],
        }}
      />
    </div>
  );
};
