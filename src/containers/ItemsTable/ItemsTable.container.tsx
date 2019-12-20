import React from 'react';
import { Button, Modal } from 'antd';
import FlexView from 'react-flexview';

import { ItemsTableStore } from './ItemsTable.store';
import DataTable from './components/DataTable';
import ItemForm from './components/ItemForm';
import FilterEditor from './components/FilterEditor';
import SortEditor from './components/SortEditor';

function ItemsTable(props: {
  store: ItemsTableStore;
  renderAction: any;
  renderEntity: any;
}): any {
  const { store: s, renderAction } = props;

  return (
    <FlexView grow>
      <FlexView column={true} grow>
        <FlexView column={true} width={400}>
          <SortEditor value={s.sortString} onChangeValue={s.setSortString} />
          <FilterEditor
            value={s.filterString}
            onChangeValue={s.setFilterString}
          />
          <Button type="primary" onClick={s.doSearch}>
            Search
          </Button>
        </FlexView>
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
