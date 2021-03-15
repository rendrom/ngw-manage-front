import { asyncRoutes, constantRoutes } from '@/router/routes';
import { GENERATE_ROUTES } from '../../constants/store';

import type { ActionTree, MutationTree } from 'vuex';
import type { RouteRecordRaw } from 'vue-router';
import type { UserPermissionState } from '../types';
import type { UserRole } from '@/types/UserRole';

type Roles = UserRole[];

/**
 * Use meta.role to determine if the current user has permission
 */
function hasPermission(roles: Roles, route: RouteRecordRaw) {
  const metaRoles = route.meta && route.meta.roles;
  if (metaRoles) {
    return roles.some((role) => metaRoles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: Roles) {
  const res: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state: UserPermissionState = {
  routes: [],
  addRoutes: [],
};

const mutations: MutationTree<UserPermissionState> = {
  SET_ROUTES: (state, routes: RouteRecordRaw[]) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions: ActionTree<UserPermissionState, unknown> = {
  [GENERATE_ROUTES.action]({ commit }, roles: Roles) {
    return new Promise((resolve) => {
      let accessedRoutes: RouteRecordRaw[];
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit(GENERATE_ROUTES.mutation, accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
