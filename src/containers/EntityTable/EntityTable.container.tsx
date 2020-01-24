import React, { useCallback, useMemo } from 'react';
import { Menu, Spin } from 'antd';
import FlexView from 'react-flexview';

import { IEntityTableStore } from './EntityTable.store';

function EntityTable(props: { store: IEntityTableStore }) {
  const { store: s } = props;

  const handleClick = useCallback(
    e => {
      s.selectEntityId(e.key);
    },
    [s],
  );

  const renderEntities = useMemo(() => {
    return s.entities.map(entity => {
      return <Menu.Item key={entity.id}>{entity.label}</Menu.Item>;
    });
  }, [s.entities]);

  return (
    <Spin spinning={s.entitiesLoading}>
      <Menu
        onClick={handleClick}
        style={{ width: 196 }}
        selectedKeys={[String(s.selectedEntityId)]}
        mode="inline"
      >
        {renderEntities}
      </Menu>
    </Spin>
  );
}

export default EntityTable;
