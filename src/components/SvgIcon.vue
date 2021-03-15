<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal as external } from '@/utils/validate';
import { computed } from 'vue';

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const isExternal = computed(() => external(props.name));
    const iconName = computed(() => `#icon-${props.name}`);

    const svgClass = computed(() =>
      props.className ? 'svg-icon ' + props.className : 'svg-icon',
    );
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
      };
    });
    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon,
    };
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
