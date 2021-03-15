import SvgIcon from '@/components/SvgIcon.vue'; // svg component
import type { App } from 'vue';

// register globally
const install = (app: App): void => {
  app.component(SvgIcon.name, SvgIcon);
};

export default install;

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (context: Record<string, any>) =>
  context.keys().map(context);
requireAll(req);

// const requireContext = require.context('./svg', false, /\.svg$/)
// const requireAll = (context: __WebpackModuleApi.RequireContext) => context.keys().map(context)

// try {
//   requireAll(requireContext)
// } catch (err) {
//   console.log(err)
// }
