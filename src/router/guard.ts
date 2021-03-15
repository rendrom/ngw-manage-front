import router from '@/router';
import store from '@/store';

import { getToken } from '@/utils/storage'; // get token from cookie
import { message } from '@/utils/element';
import getPageTitle from '@/utils/getPageTitle';
import { startPageLoading, stopPageLoading } from '@/utils/progress';
import { GENERATE_ROUTES, GET_USER_INFO, RESET_TOKEN } from '@/constants/store';

import type { RouteRecordRaw } from 'vue-router';

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  startPageLoading();

  // set page title
  document.title = getPageTitle(to.meta.title as string);

  // determine whether the user has logged in
  const token = getToken();

  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      stopPageLoading(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch(GET_USER_INFO.action, {
            token,
          });

          // generate accessible routes map based on roles
          const accessRoutes: RouteRecordRaw[] = await store.dispatch(
            GENERATE_ROUTES.action,
            roles,
          );

          // dynamically add accessible routes
          accessRoutes.forEach((x) => router.addRoute(x));

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch(RESET_TOKEN.action);
          message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          stopPageLoading();
        }
      }
    }
  } else {
    const allowForGuest =
      !to.meta ||
      !to.meta.roles ||
      !to.meta.roles.length ||
      whiteList.indexOf(to.path) !== -1;

    /* has no token*/
    if (allowForGuest) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      stopPageLoading();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  stopPageLoading();
});
