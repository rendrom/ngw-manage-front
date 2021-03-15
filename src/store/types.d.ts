import { UserRole } from '@/types/UserRole';

export type AppState = {
  language: string;
  theme: string;
  sidebar: {
    isOpen: boolean;
    withoutAnimation: boolean;
  };
  loading: boolean;
};

export type UserState = {
  token?: string;
  roles: UserRole[];
  username?: string;
};

export type UserPermissionState = {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
};

export type ViewState = {
  visitedViews: string[];
  cachedViews: string[];
};

export type RouterState = {
  routes: string[];
};

export type GlobalState = {
  app: AppState;
  user: UserState;
  view: ViewState;
  router: RouterState;
};
