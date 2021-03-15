<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="handleClick('nextgis')">
      <span class="nextgis-svg-container">
        <svg-icon name="nextgis" class="icon" />
      </span>
      NextGIS ID
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import openWindow from '@/utils/open-window'
export default defineComponent({
  name: 'SocialSignin',
  methods: {
    handleClick(thirdpart: string) {
      alert('ok');
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const client_id = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      // openWindow(url, thirdpart, 540, 540)
    },
  },
});
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .nextgis-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .nextgis-svg-container {
    background-color: #6ba2d6;
  }
}
</style>
