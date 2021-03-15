import type { ActionTree, MutationTree } from 'vuex';
import type { ViewState } from '../types';

export const state: ViewState = {
  visitedViews: [],
  cachedViews: [],
};

export const actions: ActionTree<ViewState, unknown> = {};

export const mutations: MutationTree<ViewState> = {};

export default {
  state,
  actions,
  mutations,
};
