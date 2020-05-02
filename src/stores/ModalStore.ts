import { action, observable } from 'mobx';

class ModalStore<T> {
  constructor(visible: boolean = false, payload?: T) {
    this.visible = visible;
    this.payload = payload;
  }

  @observable visible: boolean = false;
  @observable payload?: T;

  @action show(payload: T): void {
    this.visible = true;
    this.payload = payload;
  }

  @action hide(payload?: T, delay = 500): void {
    this.visible = false;
    setTimeout(() => {
      this.payload = payload;
    }, delay);
  }
}

export default ModalStore;
