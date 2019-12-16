


import {Modal} from 'antd'

function Action(props: any) {
    const {
        item,
        deleteItem,
        onClickEdit,
    } = props


    const handleDelete = () => {
        Modal.confirm({
            content: 'Delete item?',
            onOk: () => deleteItem(item.id)
        })
        
    }

    return (
        <div>
            <span onClick={onClickEdit}>Edit{'  '}</span>
            <span onClick={handleDelete}>Delete</span>
        </div>
    )
}

export default Action
