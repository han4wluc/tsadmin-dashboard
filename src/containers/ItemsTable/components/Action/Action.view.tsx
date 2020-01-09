import React from 'react';
import { useCallback } from 'react';
import { Modal, Divider } from 'antd';

function Action(props: any): any {
  const { onClickDelete, onClickEdit } = props;

  const handleOnClickDelete = useCallback(() => {
    Modal.confirm({
      content: 'Delete item?',
      onOk: onClickDelete,
    });
  }, [onClickDelete]);

  return (
    <div>
      <a onClick={onClickEdit}>Edit{'  '}</a>
      <a onClick={handleOnClickDelete}>Delete</a>
    </div>
  );
}

export default Action;
