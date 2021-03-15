import store from '@/store';
import { START_LOADING, STOP_LOADING } from '@/constants/store';

export function startPageLoading() {
  store.dispatch(START_LOADING.action);
}

export function stopPageLoading() {
  store.dispatch(STOP_LOADING.action);
}
