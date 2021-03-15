<template>
  <el-container>
    <el-header class="p0" height="50px">
      <app-navbar />
    </el-header>
    <el-main>
      <app-main />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNavbar from './components/AppNavbar.vue';
import AppMain from './components/AppMain.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    AppNavbar,
    // AppSidebar,
  },
  setup() {
    return {};
  },
});
</script>

<style></style>
