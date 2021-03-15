import { createApp } from 'vue';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import '@/router/guard';
import icons from '@/icons';
import { installMdi } from '@/plugins/mdi';
import { installElementPlus } from '@/plugins/element';

import App from '@/App.vue';

import '@/styles/style.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(icons);


installMdi(app);
installElementPlus(app);

router.isReady().then(() => app.mount('#app'));
