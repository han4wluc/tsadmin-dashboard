import React, { useCallback, useMemo } from 'react';
import { Menu, Spin } from 'antd';
import FlexView from 'react-flexview';

import { IEntityTableStore } from './EntityTable.store';

function EntityTable(props: { store: IEntityTableStore }) {
  const { store: s } = props;

  const handleClick = useCallback(
    e => {
      s.selectEntityId(parseInt(e.key, 10));
    },
    [s],
  );

  const renderEntities = useMemo(() => {
    return s.entities.map(entity => {
      return <Menu.Item key={entity.id}>{entity.label}</Menu.Item>;
    });
  }, [s]);

  return (
    <FlexView
      basis={200}
      style={{
        minHeight: 80,
      }}
    >
      <Spin spinning={s.entitiesLoading}>
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          selectedKeys={[s.selectedEntityId]}
          mode="inline"
        >
          {renderEntities}
        </Menu>
      </Spin>
    </FlexView>
  );
}

export default EntityTable;
