import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes } from './routes';

export const ROUTE_WHITE_LIST: string[] = [];

/**
 * Create router
 */
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * Reset router
 */
export function resetRouter(): void {
  router.getRoutes().forEach((route) => {
    const name = route.name as string;

    if (name && !ROUTE_WHITE_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
    constantRoutes.forEach((x) => {
      router.addRoute(x);
    });
  });
}

export default router;
