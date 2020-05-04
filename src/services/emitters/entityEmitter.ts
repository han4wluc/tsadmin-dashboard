import { EventEmitter, EventSubscription } from 'fbemitter';

enum Events {
  doFetchEntities = 'doFetchEntities',
  onChooseEntity = 'onChooseEntity',
}

export class EntityEventEmitter extends EventEmitter {
  emitDoFetchEntities = (): void => {
    this.emit(Events.doFetchEntities);
  };

  addDoFetchEntitiesListener = (calllback: Function): EventSubscription => {
    return this.addListener(Events.doFetchEntities, calllback);
  };

  emitOnChooseEntity = (entity: any): void => {
    this.emit(Events.onChooseEntity, entity);
  };

  addOnChooseEntityListerner = (callback: (entity: any) => void): any => {
    return this.addListener(Events.onChooseEntity, callback);
  };
}

const emitter = new EntityEventEmitter();

export default emitter;
