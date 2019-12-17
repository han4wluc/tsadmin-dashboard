import React from 'react';
import { useCallback } from 'react';
import { Modal } from 'antd';

function Action(props: any): any {
  const { item, onClickDelete, onClickEdit } = props;

  const handleOnClickEdit = useCallback(() => {
    onClickEdit(item.id);
  }, [onClickEdit, item]);

  const handleOnClickDelete = useCallback(() => {
    Modal.confirm({
      content: 'Delete item?',
      onOk: () => onClickDelete(item.id),
    });
  }, [onClickDelete, item]);

  return (
    <div>
      <span onClick={handleOnClickEdit}>Edit{'  '}</span>
      <span onClick={handleOnClickDelete}>Delete</span>
    </div>
  );
}

export default Action;
