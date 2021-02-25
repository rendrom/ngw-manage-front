import { createApp } from 'vue';
import { Button, Form } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(Form)
  .mount('#app');
