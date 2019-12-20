import React from 'react';
import { Input } from 'antd';

function SortEditor(props: any): any {
  const { value, onChangeValue } = props;
  return (
    <Input
      value={value}
      onChange={(event): void => {
        onChangeValue(event.target.value);
      }}
      placeholder="Sort"
    />
  );
}

export default SortEditor;
