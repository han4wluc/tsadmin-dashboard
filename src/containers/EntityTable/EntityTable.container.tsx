import React, { useMemo } from 'react';
import { Menu, Spin } from 'antd';

import { EntityTableStore } from './EntityTable.store';

function EntityTable(props: {
  store: EntityTableStore;
}): React.FunctionComponentElement<any> {
  const { store: s } = props;
  const renderEntities = useMemo(() => {
    return s.entities.map((entity: any) => {
      const handleClick = () => {
        s.selectEntity(entity);
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
