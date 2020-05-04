import React, { useMemo } from 'react';
import { Menu, Spin } from 'antd';
import FlexView from 'react-flexview';

import { IEntityTableStore } from './EntityTable.store';

function EntityTable(props: { store: IEntityTableStore }) {
  const { store: s } = props;
  const renderEntities = useMemo(() => {
    return s.entities.map(entity => {
      const handleClick = () => {
        s.selectEntityId(entity.id);
      };
      return (
        <Menu.Item onClick={handleClick} key={entity.id}>
          {entity.label}
        </Menu.Item>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.entities]);

  return (
    <Spin spinning={s.entitiesLoading}>
      <Menu
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
