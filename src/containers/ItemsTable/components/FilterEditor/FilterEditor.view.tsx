import React from 'react';
import { Input } from 'antd';

function FilterEditor(props: any): any {
  const { value, onChangeValue } = props;
  return (
    <Input
      value={value}
      onChange={(event): void => {
        onChangeValue(event.target.value);
      }}
      placeholder="Filter"
    />
  );
}

export default FilterEditor;
