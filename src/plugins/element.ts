import type { App } from 'vue';

// import ElementPlus from 'element-plus';
// import './element-theme.scss';

// export function installElementPlus(app: App) {
//   app.use(ElementPlus);
// }

import {
  ElButton,
  ElDialog,
  ElContainer,
  ElMain,
  ElHeader,
  ElFormItem,
  ElForm,
  ElTooltip,
  ElInput,
} from 'element-plus';

const components: any[] = [
  ElDialog,
  ElInput,
  ElButton,
  ElContainer,
  ElMain,
  ElHeader,
  ElFormItem,
  ElForm,
  ElTooltip,
];

const plugins: any[] = [
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage,
  // ElMessageBox,
  // ElNotification,
];

export function installElementPlus(app: App) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
