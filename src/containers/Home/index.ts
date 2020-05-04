import HomeView from './Home.view';
import { HomeStore, IHomeStoreDependencies } from './Home.store';

import applicationStore from '~/globalStores/applicationStore';
import entitiesStore from '~/globalStores/entitiesStore';

import mobxReactBind from 'mobx-react-bind';
export default mobxReactBind<IHomeStoreDependencies>({
  Store: HomeStore,
  dependencies: {
    applicationStore,
    entitiesStore,
  },
})(HomeView);
