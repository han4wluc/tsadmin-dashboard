import React from 'react';
import { ItemsTableStore } from './ItemsTable.store';
import Action from './components/Action';

export default (s: ItemsTableStore): object => {
  return {
    // eslint-disable-next-line react/display-name
    renderAction: (_: any, item: any): any => {
      return (
        <Action
          item={item}
          onClickEdit={s.showUpdateModal}
          onClickDelete={s.deleteItem}
        />
      );
    },
  };
};
