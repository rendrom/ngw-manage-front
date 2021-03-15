import { RouteMeta } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[];
  }
}
