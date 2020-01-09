import React, { useCallback } from 'react';
import { Button, Modal, Card, Divider } from 'antd';
import FlexView from 'react-flexview';

import Action from './components/Action';

import { IItemsTableStore } from './ItemsTable.store';
import DataTable from './components/DataTable';
import ItemForm from './components/ItemForm';
import FilterEditor from './components/FilterEditor';
import SortEditor from './components/SortEditor';

function ItemsTable(props: { store: IItemsTableStore }): any {
  const { store: s } = props;

  const renderAction = useCallback(
    (_, item) => {
      const handleOnClickEdit = () => {
        s.showUpdateModal(item.id);
      };
      const handleOnClickDelete = () => {
        s.deleteItem(item.id);
      };
      return (
        <Action
          onClickEdit={handleOnClickEdit}
          onClickDelete={handleOnClickDelete}
        />
      );
    },
    [s],
  );

  return (
    <FlexView grow>
      <FlexView column={true} grow>
        <Card>
          <FlexView column={true}>
            <SortEditor value={s.sortString} onChangeValue={s.setSortString} />
            <FilterEditor
              value={s.filterString}
              onChangeValue={s.setFilterString}
            />
            <Button style={{ width: 300 }} type="primary" onClick={s.doSearch}>
              Search
            </Button>
          </FlexView>
        </Card>
        <Divider />
        <FlexView hAlignContent="right" height="64px">
          <Button type="primary" onClick={s.showCreateModal}>
            Create
          </Button>
        </FlexView>
        <DataTable
          items={s.items}
          loading={s.itemsLoading}
          columns={s.columns}
          deleteItem={s.deleteItem}
          renderAction={renderAction}
          pageInfo={s.pageInfo}
          fetchData={s.fetchData}
        />
      </FlexView>
      <Modal
        title={s.modalTitle}
        onCancel={s.hideModal}
        visible={s.modalVisible}
        width="60%"
        footer={null}
      >
        <ItemForm
          key={String(s.modalVisible)}
          columns={s.columns}
          mode={s.modalMode}
          item={s.currentEditItem}
          loading={s.createItemLoading}
          onSubmit={s.onSubmitForm}
          okText={s.modalTitle}
        />
      </Modal>
    </FlexView>
  );
}

export default ItemsTable;
