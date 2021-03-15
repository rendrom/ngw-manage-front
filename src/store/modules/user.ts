import type { ActionTree, MutationTree } from 'vuex';
import * as storage from '@/utils/storage';
import {
  SET_TOKEN,
  SIGN_OUT,
  LOGIN,
  GET_USER_INFO,
  RESET_TOKEN,
  LOGOUT,
} from '@/constants/store';
import { userApi } from '@/api/userApi';
import { resetRouter } from '@/router';
import { removeToken } from '@/utils/storage';

import type { UserState } from '../types';
import type { Credentials } from '@/interfaces/Credentials';
import type { UserRole } from '@/types/UserRole';

export const state: UserState = {
  token: storage.getToken() || '',
  username: '',
  roles: [],
};

export const actions: ActionTree<UserState, unknown> = {
  [GET_USER_INFO.action]({ commit }, options) {
    return new Promise<UserState>((resolve, reject) => {
      userApi
        .currentUser(options)
        .then((data) => {
          if (!data) {
            reject('Verification failed, please Login again.');
          }

          const { username, is_superuser } = data;

          const roles: UserRole[] = [
            is_superuser || username === 'admin' ? 'admin' : 'user',
          ];

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!');
          }

          commit('SET_ROLES', roles);
          commit('SET_NAME', username);
          resolve({ username, roles });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [SET_TOKEN.action]({ commit }, token: string) {
    storage.setToken(token);
    commit(SET_TOKEN.mutation, token);
  },

  // remove token
  [RESET_TOKEN.action]({ commit }) {
    return new Promise((resolve) => {
      commit(SET_TOKEN.mutation, '');
      commit('SET_ROLES', []);
      removeToken();
      resolve(undefined);
    });
  },

  [LOGIN.action]({ dispatch }, credentials: Credentials) {
    const { username, password } = credentials;
    return new Promise((resolve, reject) => {
      userApi
        .login({ username: username.trim(), password: password })
        .then((response) => {
          if (!response) {
            throw new Error('Nothing returned');
          }
          const { token } = response;
          dispatch(SET_TOKEN.action, token).then(() => {
            resolve(response);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [LOGOUT.action]({ commit }) {
    return new Promise((resolve, reject) => {
      userApi
        .logout()
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_NAME', '');
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch('tagsView/delAllViews', null, { root: true });

          resolve(undefined);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [SIGN_OUT.action]({ commit }) {
    storage.removeToken();
    console.log('User signed out');
    commit(SET_TOKEN.mutation, '');
  },
};

export const mutations: MutationTree<UserState> = {
  [SET_TOKEN.mutation](state, token: string) {
    state.token = token;
  },

  SET_ROLES(state, roles: UserRole[]) {
    state.roles = roles;
  },

  SET_NAME(state, name: string) {
    state.username = name;
  },
};

export default {
  state,
  actions,
  mutations,
};
