import React from 'react';
import { EntityTableStore } from './EntityTable.store';
import EntityListItem from './components/EntityListItem';

export default (s: EntityTableStore): any => {
  return {
    // eslint-disable-next-line
    renderEntity: (entity: any): any => {
      const isSelected =
        !!s.selectedEntity && s.selectedEntity.id === entity.id;
      return (
        <EntityListItem
          entity={entity}
          isSelected={isSelected}
          selectEntityId={s.selectEntityId}
        />
      );
    },
  };
};
