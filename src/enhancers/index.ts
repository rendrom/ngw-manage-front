import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { createStore } from '@/store';
import getPageTitle from '@/utils/getPageTitle';

type RootStore = ReturnType<typeof createStore>;

export const useEnhancer = () => {
  const store = useStore<RootStore>();
  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n();
  const title = getPageTitle();

  return {
    i18n,
    route,
    router,
    store,
    title,
  };
};
