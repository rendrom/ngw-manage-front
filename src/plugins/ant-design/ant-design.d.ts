import { ComponentCustomProperties } from 'vue';
import { Form } from 'ant-design-vue';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $form: Form;
  }
}
