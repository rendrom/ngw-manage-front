import type { ActionTree, MutationTree } from 'vuex';
import type { AppState } from '../types';
import * as storage from '@/utils/storage';
import {
  SET_LANGUAGE,
  SET_LOADING,
  START_LOADING,
  STOP_LOADING,
  TOGGLE_SIDEBAR,
} from '@/constants/store';

const { VUE_APP_FALLBACK_LANGUAGE = 'zh' } = process.env;

export const state: AppState = {
  language: storage.getLanguage() || VUE_APP_FALLBACK_LANGUAGE,
  theme: storage.getTheme() || 'theme-default',
  loading: false,
  sidebar: {
    isOpen: true,
    withoutAnimation: false,
  },
};

export const actions: ActionTree<AppState, unknown> = {
  [SET_LANGUAGE.action]({ commit }, language: string) {
    storage.setLanguage(language);
    commit(SET_LANGUAGE.mutation, language);
  },

  [SET_LOADING.action]({ commit }, loading: boolean) {
    commit(SET_LOADING.mutation, loading);
  },

  [START_LOADING.action]({ commit }) {
    commit(START_LOADING.mutation, true);
  },

  [STOP_LOADING.action]({ commit }) {
    commit(STOP_LOADING.mutation, false);
  },

  [TOGGLE_SIDEBAR.action]({ commit }) {
    commit(TOGGLE_SIDEBAR.mutation);
  },
};

export const mutations: MutationTree<AppState> = {
  [TOGGLE_SIDEBAR.mutation](state) {
    state.sidebar.isOpen = !state.sidebar.isOpen;
  },

  [SET_LANGUAGE.mutation](state, language: string) {
    state.language = language;
  },

  [SET_LOADING.mutation](state, loading: boolean) {
    state.loading = loading;
  },
};

export default {
  state,
  actions,
  mutations,
};
