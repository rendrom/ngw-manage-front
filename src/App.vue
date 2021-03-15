<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { ElLoading } from 'element-plus';
import { useEnhancer } from '@/enhancers';
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

export default defineComponent({
  setup() {
    const { store } = useEnhancer();
    const loading = computed(() => store.getters.loading);

    let loader: ILoadingInstance;
    const toggleLoading = (val: boolean) => {
      if (val) {
        loader = ElLoading.service({});
      } else if (loader) {
        loader.close();
      }
    };
    watch(loading, toggleLoading);
    toggleLoading(loading.value);
    return { store, loading };
  },
});
</script>

<style lang="scss"></style>
