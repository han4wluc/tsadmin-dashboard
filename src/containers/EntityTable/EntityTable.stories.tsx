import React from 'react';
import 'antd/dist/antd.css';
import { action } from '@storybook/addon-actions';
import EntityTable from './EntityTable.container';

export default {
  title: 'Containers | EntityTable',
};

const entity1 = {
  id: 1,
  label: 'User',
  columns: [],
};

const entity2 = {
  id: 2,
  label: 'Post',
  columns: [],
};

export const normal = () => {
  const store = {
    selectedEntity: entity1,
    entitiesLoading: false,
    entities: [entity1, entity2],
    selectEntityId: action('selectEntityId'),
    selectedEntityId: '1',
  };
  return (
    <div style={{ width: 200 }}>{/* <EntityTable store={store} /> */}</div>
  );
};

export const loading = () => {
  const store = {
    selectedEntity: entity1,
    entitiesLoading: true,
    entities: [],
    selectEntityId: action('selectEntityId'),
    selectedEntityId: '1',
  };
  return (
    <div style={{ width: 200 }}>{/* <EntityTable store={store} /> */}</div>
  );
};
