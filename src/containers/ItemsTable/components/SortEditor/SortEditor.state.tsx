import { action, observable } from 'mobx';
import { BaseStore } from '../../../../utils/mobxConnect';

class SortEditorStore extends BaseStore {
  constructor(props: { localValue: any }) {
    super(props);
    this.localValue = props.localValue;
  }
  @observable editModalVisible = false;
  @observable localValue: any[] = [];
  @action onClickAdd = () => {
    this.localValue.push({
      id: '',
      operator: '',
    });
  };
  @action updateId = (index: any, value: any) => {
    this.localValue[index].id = value;
  };
  @action updateOperator = (index: any, value: any) => {
    this.localValue[index].operator = value;
  };
  @action delete = (index: number) => {
    this.localValue.splice(index, 1);
  };
  @action showEditModal = () => {
    this.editModalVisible = true;
  };
  @action hideEditModal = () => {
    this.editModalVisible = false;
  };
}

export default SortEditorStore;
