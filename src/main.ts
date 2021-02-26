import { createApp } from 'vue';
import App from './App.vue';
import { setupElement } from './plugins/element';
import router from './router';
import store from './store';

const app = createApp(App)
  .use(store)
  .use(router);

setupElement(app);

app.mount('#app');
