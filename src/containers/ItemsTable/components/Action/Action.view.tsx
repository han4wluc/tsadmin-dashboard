import React from 'react';
import { useCallback } from 'react';
import { Modal, Divider, Button } from 'antd';

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
      <Button onClick={onClickEdit} type="link">
        Edit
      </Button>
      <Button onClick={handleOnClickDelete} type="link" danger={true}>
        Delete
      </Button>
    </div>
  );
}

export default Action;
