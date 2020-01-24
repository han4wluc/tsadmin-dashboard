import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import ItemsTable from './ItemsTable.container';
import { ItemsTableStore } from './ItemsTable.store';

export default {
  title: 'Containers | ItemsTable',
};

const items = [
  {
    id: 1,
    username: 'go2314f',
    age: 4,
    birthday: '2020-01-05',
    role: 'admin',
    meta: {
      postCount: 12,
      friendsCount: 55,
    },
    createdAt: '2020-01-05T05:22:24.881Z',
  },
  {
    id: 2,
    username: 'qywert44',
    age: 412,
    birthday: '2020-01-05',
    role: 'editor',
    meta: null,
    createdAt: '2020-01-05T06:49:51.000Z',
  },
];
const columns = [
  {
    id: 'id',
    label: 'ID',
    type: 'id',
  },
  {
    id: 'username',
    label: 'Username',
    type: 'string',
  },
  {
    id: 'age',
    label: 'Age',
    type: 'number',
  },
  {
    id: 'birthday',
    label: 'Birthday',
    type: 'date',
  },
  {
    id: 'role',
    label: 'Role',
    type: 'enum',
    options: {
      enumObject: {
        admin: 'admin',
        editor: 'editor',
      },
    },
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    type: 'datetime',
  },
];

export const normal = () => {
  return (
    <div style={{ padding: 32 }}>
      <ItemsTable
        store={{
          showUpdateModal: action('showUpdateModal'),
          deleteItem: () => {
            return Promise.resolve();
          },
          sortCondition: [],
          setSortCondition: action('sortCondition'),
          filterCondition: [],
          setFilterCondition: action('setFilterString'),
          doSearch: action('doSearch'),
          showCreateModal: action('showCreateModal'),
          items,
          itemsLoading: false,
          columns: columns,
          pageInfo: {
            num: 10,
            total: 100,
            size: 10,
          },
          fetchData: () => {
            return Promise.resolve();
          },
          modalTitle: 'Title',
          hideModal: action('hideModal'),
          modalVisible: false,
          modalMode: 'create',
          currentEditItem: {},
          createItemLoading: false,
          onSubmitForm: action('onSubmitForm'),
        }}
      />
    </div>
  );
};
