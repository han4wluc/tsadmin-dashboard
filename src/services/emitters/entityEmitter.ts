import { EventEmitter } from 'fbemitter';

enum Events {
  onChooseEntity = 'onChooseEntity',
}

export class EntityEventEmitter extends EventEmitter {
  emitOnChooseEntity = (entity: any): void => {
    this.emit(Events.onChooseEntity, entity);
  };

  addOnChooseEntityListerner = (callback: (entity: any) => void): any => {
    return this.addListener(Events.onChooseEntity, callback);
  };
}

const emitter = new EntityEventEmitter();

export default emitter;
