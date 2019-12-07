


import {Modal} from 'antd'
import ItemForm from '../../../ItemForm'

function Action(props: any) {
    const {
        columns, onSubmit, item,
        store: {
            hide,
            show,
            visible
        }
    } = props

    return (
        <div>
            <span onClick={show}>Edit{'  '}</span>
            <span>Delete</span>
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
                    onSubmit={onSubmit}
                    mode="update"
                />
            </Modal>
        </div>
    )
}

export default Action
