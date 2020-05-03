import { action, observable } from 'mobx';

class SortEditorStore {
  constructor(props: { localValue: any }) {
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
