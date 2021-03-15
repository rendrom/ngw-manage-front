import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/common/redirect.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { anon: true },
  },
  {
    path: '/not-found',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/common/not-found.vue'),
  },

  {
    path: '/',
    redirect: '/catalog',
    component: Layout,
    children: [
      {
        path: '/catalog',
        name: 'Catalog',
        component: () => import('@/views/catalog/catalog.vue'),
      },
    ],
  },
];

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    name: 'Fallback',
    redirect: { name: 'NotFound' },
    meta: {
      hidden: true,
    },
  },
];
