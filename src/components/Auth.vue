<template>
  <el-form :model="authForm" :rules="rules" ref="authForm" label-position="top">
    <el-form-item label="NextGIS Web" prop="ngw">
      <el-input
        v-model="authForm.ngw"
        :disabled="formProcessing"
        ref="ngwInput"
      ></el-input>
    </el-form-item>
    <el-form-item label="User" prop="user">
      <el-input
        v-model="authForm.user"
        :disabled="formProcessing"
        ref="userInput"
      ></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="authForm.password"
        :disabled="formProcessing"
        type="password"
      ></el-input>
      <!-- <p v-if="isErrorForField('password', errors)">
        {{ getErrorForField("password", errors) }}
      </p> -->
    </el-form-item>
    <el-form-item>
      <div class="submit-wrapper">
        <el-button
          type="primary"
          @click="submit('authForm')"
          :loading="formProcessing"
          >Log in</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";

interface FormError {
  message: string;
  path: string[];
}

export default defineComponent({
  setup() {
    const rules = {
      email: { required: true, message: "Required", trigger: "change" },
      password: { required: true, message: "Required", trigger: "change" },
    };
    const formProcessing = ref(false);
    const errors = ref<FormError[]>([]);
    return {
      rules,
      formProcessing,
      errors,
    };
  },
  data: () => {
    return {
      authForm: {
        ngw: "",
        user: "",
        password: "",
      },
    };
  },
  methods: {
    // isErrorForField(field, errors) {
    //   if (!errors && !errors.length) {
    //     return false;
    //   }
    //   let filtered = errors.filter((error) => {
    //     return error.path[0] === field;
    //   });
    //   if (filtered.length) {
    //     return filtered;
    //   }
    // },
    // getErrorForField(field, errors) {
    //   if (!errors && !errors.length) {
    //     return false;
    //   }
    //   let filtered = errors.filter((error) => {
    //     return error.path[0] === field;
    //   });
    //   if (filtered.length) {
    //     return filtered[0].message;
    //   }
    // },
    // supportGlobalErrorMessage() {
    //   this.errors.forEach((error) => {
    //     if (!error.path.length) {
    //       this.$message({
    //         message: error.message,
    //         type: "error",
    //       });
    //     }
    //   });
    // },
    submit(formName: string) {
      const form = this.$refs[formName] as HTMLFormElement;
      form.validate((valid: boolean) => {
        if (!valid) {
          return false;
        }
        this.formProcessing = true;
        // send data to backend
        // error response looks like this:
        const errors: FormError[] = [
          { message: "email address is invalid", path: ["email"] },
          { message: "example error for password field", path: ["password"] },
        ];
        setTimeout(() => {
          this.formProcessing = false;
          this.errors = errors;
          //   this.supportGlobalErrorMessage();
        }, 500);
      });
    },
  },
});
</script>
