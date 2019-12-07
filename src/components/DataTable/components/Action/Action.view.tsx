


import {Modal} from 'antd'
import ItemForm from '../../../ItemForm'

function Action(props: any) {
    const {
        columns, item, entity, replaceOneItem, deleteItem,
        store: {
            hide,
            show,
            visible,
            updateEntity,
            loading
        }
    } = props

    const handleSubmit = (data: any) => {
        if(!entity) {
            return
        }
        updateEntity(entity, item.id, data, replaceOneItem)
    }

    const handleDelete = () => {
        Modal.confirm({
            content: 'Delete item?',
            onOk: () => deleteItem(item.id)
        })
        
    }

    return (
        <div>
            <span onClick={show}>Edit{'  '}</span>
            <span onClick={handleDelete}>Delete</span>
            <Modal
                key={item.id}
                title="Update"
                visible={visible}
                onCancel={hide}
                width="60%"
                footer={null}
                destroyOnClose={true}
            >
                <ItemForm
                    columns={columns}
                    item={item}
                    onSubmit={handleSubmit}
                    mode="update"
                    loading={loading}
                    okText="Update"
                />
            </Modal>
        </div>
    )
}

export default Action
