import type { ActionTree, MutationTree } from 'vuex';
import type { RouterState } from '../types';

export const state: RouterState = {
  routes: [],
};

export const actions: ActionTree<RouterState, unknown> = {};

export const mutations: MutationTree<RouterState> = {};

export default {
  state,
  actions,
  mutations,
};
