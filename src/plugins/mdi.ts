import type { App } from 'vue';
import mdiVue from 'mdi-vue';
import { mdiLogin, mdiPower } from '@mdi/js';

// <mdicon name="alert" />

export function installMdi(app: App) {
  app.use(mdiVue, {
    icons: { mdiLogin, mdiPower },
  });
}
