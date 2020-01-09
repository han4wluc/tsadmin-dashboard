import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import ItemForm from './ItemForm.view';

export default {
  title: 'Components | ItemForm',
};

const columns = [
  {
    id: 'id',
    label: 'ID',
    type: 'id',
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
  },
  {
    id: 'username',
    label: 'Username',
    type: 'string',
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
  },
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
  },
  {
    id: 'birthday',
    label: 'Birthday',
    type: 'date',
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
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
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    type: 'datetime',
    create: {
      editable: true,
      display: true,
    },
    update: {
      editable: true,
      display: true,
    },
  },
];

export const create = () => {
  return (
    <div
      style={{
        padding: 32,
        width: '80%',
      }}
    >
      <ItemForm
        item={{
          id: 1,
        }}
        onSubmit={action('onSubmit')}
        mode="create"
        columns={columns}
        loading={false}
        okText="Create"
      />
    </div>
  );
};

export const update = () => {
  return (
    <div
      style={{
        padding: 32,
        width: '80%',
      }}
    >
      <ItemForm
        item={{
          id: 1,
        }}
        onSubmit={action('onSubmit')}
        mode="update"
        columns={columns}
        loading={false}
        okText="Edit"
      />
    </div>
  );
};

export const loading = () => {
  return (
    <div
      style={{
        padding: 32,
        width: '80%',
      }}
    >
      <ItemForm
        item={{
          id: 1,
        }}
        onSubmit={action('onSubmit')}
        mode="create"
        columns={columns}
        loading={true}
        okText="Create"
      />
    </div>
  );
};
