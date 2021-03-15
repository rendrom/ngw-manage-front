<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login to {{ title }}</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="usernameRef"
          placeholder="Username"
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >Login</el-button
      >

      <div style="">
        <social-sign />
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
  toRefs,
  nextTick,
  toRaw,
} from '@vue/runtime-core';
import { useEnhancer } from '@/enhancers';
import { LOGIN } from '@/constants/store';

import type { Credentials } from '@/interfaces/Credentials';
import SocialSign from './components/SocialSignin.vue';

interface LoginState {
  loginForm: Credentials;
  otherQuery: Record<string, any>;
  redirect: any;
  usernameRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  loginFormRef: HTMLFormElement | null;
  passwordType: 'password' | '';
  capsTooltip: boolean;
  loading: boolean;
  showDialog: boolean;
}

export default defineComponent({
  name: 'Login',
  components: { SocialSign },
  setup() {
    const { route, router, store } = useEnhancer();
    const state = reactive<LoginState>({
      loginForm: {
        username: 'admin',
        password: 'admin',
      },
      otherQuery: {},
      redirect: null,
      usernameRef: null,
      passwordRef: null,
      loginFormRef: null,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
    });
    const getOtherQuery = (query: Record<string, any>) => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {} as Record<string, any>);
    };

    watch(
      route,
      (route) => {
        const query = route.query;
        if (query) {
          state.redirect = query.redirect;
          state.otherQuery = getOtherQuery(query);
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      if (state.loginForm.username === '') {
        state.usernameRef?.focus();
      } else if (state.loginForm.password === '') {
        state.passwordRef?.focus();
      }
    });

    const checkCapslock = (e: { key: string }) => {
      const { key } = e;
      state.capsTooltip = !!(
        key &&
        key.length === 1 &&
        key >= 'A' &&
        key <= 'Z'
      );
    };
    const showPwd = () => {
      if (state.passwordType === 'password') {
        state.passwordType = '';
      } else {
        state.passwordType = 'password';
      }
      nextTick(() => {
        state.passwordRef?.focus();
      });
    };
    const handleLogin = () => {
      state.loginFormRef?.validate((valid: boolean) => {
        if (valid) {
          state.loading = true;
          const data = toRaw(state.loginForm);
          console.log(1234);
          store
            .dispatch(LOGIN.action, data)
            .then(() => {
              router.push({
                path: state.redirect || '/',
                query: state.otherQuery,
              });
              state.loading = false;
            })
            .catch(() => {
              state.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    return {
      ...toRefs(state),
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
      },
      getOtherQuery,
      checkCapslock,
      showPwd,
      handleLogin,
    };
  },
});
</script>

<style lang="scss">
// $bg: $bg-light-black;
// $light_gray: #fff;
// $cursor: #fff;
$bg: #fff;
$light_gray: #fff;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
// $bg: $bg-light-black;
// $dark_gray: #889aa4;
// $light_gray: #eee;

$bg: #fff;
$dark_gray: #000;
$light_gray: #000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
