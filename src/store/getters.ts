import type { GetterTree } from 'vuex';
import type { GlobalState } from './types';

const getters: GetterTree<GlobalState, unknown> = {
  // app
  language: (state) => state.app.language,
  theme: (state) => state.app.theme,
  sidebar: (state) => state.app.sidebar,
  loading: (state) => state.app.loading,

  // user
  username: (state) => state.user.username,
  token: (state) => state.user.token,
  roles: (state) => state.user.roles,

  // view
  visitedViews: (state) => state.view.visitedViews,
  cachedViews: (state) => state.view.cachedViews,
};

export default getters;
