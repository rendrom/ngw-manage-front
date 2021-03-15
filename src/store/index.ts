import { Store, ModuleTree, createStore as createVuexStore } from 'vuex';
import type { GlobalState } from './types';
import getters from './getters';
import app from './modules/app';
import permission from './modules/permission';
import user from './modules/user';
import view from './modules/view';
import router from './modules/router';

const modules: ModuleTree<unknown> = {
  app,
  user,
  permission,
  view,
  router,
};

export const createStore = (): Store<GlobalState> =>
  createVuexStore({ getters, modules });

const store = createStore();

export default store;
