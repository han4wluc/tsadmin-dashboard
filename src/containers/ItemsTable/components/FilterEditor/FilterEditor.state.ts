import { action, observable } from 'mobx';

export class FilterEditorStore {
  constructor(props: { localValue: any }) {
    this.localValue = props.localValue;
  }
  @observable editModalVisible = false;
  @observable localValue: any[] = [];
  @action onClickAdd = () => {
    this.localValue.push({
      id: '',
      operator: '',
      value: '',
    });
  };
  @action updateId = (index: any, value: any) => {
    this.localValue[index].id = value;
  };
  @action updateOperator = (index: any, value: any) => {
    this.localValue[index].operator = value;
  };
  @action updateValue = (index: any, value: any) => {
    this.localValue[index].value = value;
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
