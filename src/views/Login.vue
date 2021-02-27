<template>
  <auth-form></auth-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "../components/Auth.vue";

export default defineComponent({
  components: { AuthForm },
});
</script>
