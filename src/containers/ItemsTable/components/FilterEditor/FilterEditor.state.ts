import { action, observable } from 'mobx';

class Store {
  constructor({ localValue }: { localValue: any }) {
    this.localValue = localValue;
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

export default Store;
