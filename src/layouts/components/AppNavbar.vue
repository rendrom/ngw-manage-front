<template>
  <div class="app-navbar">
    <div class="navbar-block ml2">
      <router-link to="/" class="navbar-brand">{{ title }}</router-link>
    </div>
    <div class="navbar-block">
      <!-- <el-button type="primary" icon="el-icon-user" circle></el-button> -->
      <el-button circle @click="handleLogin">
        <mdicon :name="authIcon" size="16" />
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useEnhancer } from '@/enhancers';
import { LOGOUT } from '../../constants/store';

export default defineComponent({
  name: 'AppNavbar',

  setup() {
    const { i18n, router, store, title } = useEnhancer();

    const username = computed(() => store.getters.username);
    const authIcon = computed(() => {
      return username.value ? 'power' : 'login';
    });

    const handleLogin = () => {
      if (!username.value) {
        router.push('login');
      } else {
        store.dispatch(LOGOUT.action);
      }
    };

    return {
      i18n,
      username,
      authIcon,
      handleLogin,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-navbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $navbar-height;
  line-height: $navbar-height;
  padding-right: $gutter-md;
  background-color: $bg-nextgis-light;
  box-shadow: 0 1px 3px rgba($black, 0.12), 0 0 3px rgba($black, 0.04);
  color: $primary-color;

  .navbar-brand {
    font-weight: 500;
    font-size: 24px;
  }

  .navbar-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    color: $white;
  }

  .user-message-badge {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .user-name {
    position: relative;
    margin-right: $gutter-xs;
    font-size: 16px;
    user-select: none;
  }

  .navbar-block {
    position: relative;
    display: flex;
    align-items: center;

    &-item {
      position: relative;
      min-width: $navbar-height;
      margin-right: $gutter-sm;
      text-align: center;
      font-size: 24px;
      cursor: pointer;
      @include trs;

      &:hover {
        background-color: darken($bg-light-black, 20%);
      }
    }
  }
}
</style>
