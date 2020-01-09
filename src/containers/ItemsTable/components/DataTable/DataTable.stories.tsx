import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import DataTable from './DataTable.view';
import Action from '../Action';

export default {
  title: 'Components | DataTable',
};

const renderAction = () => {
  return (
    <Action
      onClickEdit={action('onClickEdit')}
      onClickDelete={action('onClickDelete')}
    />
  );
};

export const normal = () => {
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
  return (
    <div>
      <DataTable
        items={items}
        loading={false}
        columns={columns}
        renderAction={renderAction}
        pageInfo={{}}
        fetchData={action('fetchData')}
      />
    </div>
  );
};

export const loading = () => {
  return (
    <div>
      <DataTable
        items={[]}
        loading={true}
        columns={[]}
        renderAction={renderAction}
        pageInfo={{}}
        fetchData={action('fetchData')}
      />
    </div>
  );
};
