import mobxReactBind from 'mobx-react-bind';

import applicationStore from '~/globalStores/applicationStore';
import { entityService } from '~/services/api/EntityService';
import entityEmitter from '~/services/emitters/entityEmitter';

import HomeView from './Home.view';
import { HomeStore, IHomeStoreDependencies } from './Home.store';

export default mobxReactBind<IHomeStoreDependencies>({
  Store: HomeStore,
  dependencies: {
    applicationStore,
    entityService,
    entityEmitter,
  },
})(HomeView);
