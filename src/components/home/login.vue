<template>
    <a-space class="login-form" direction="vertical" size="large" :style="{}">
        <a-typography-title :heading="1" class="login-title">登录</a-typography-title>
        <a-form class="login-form-content" :model="form" :rules="rules" layout="vertical">
            <a-form-item class="login-form-item" field="name" label="用户名">
                <a-input v-model="form.name" placeholder="请输入你的用户名..." />
            </a-form-item>
            <a-form-item class="login-form-item" field="password" label="密码" validate-trigger="blur">
                <a-input-password v-model="form.password" placeholder="请输入你的密码..." />
            </a-form-item>
            <a-form-item>
                <a-button shape="round" class="login-btn">登录</a-button>
            </a-form-item>
        </a-form>
    </a-space>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const form = reactive({
    name: '',
    password: '',
})
const rules = {
    name: [
        {
            required: true,
            message: 'name is required',
        },
    ],
    password: [
        {
            required: true,
            message: 'password is required',
        },
    ],
}
</script>
<style lang="scss" scoped>
.login-form {
    background-color: #DCDCDC;
    margin-top: 12.5rem;
    margin-right: 12rem;
    border-radius: 30px;
    width: 25rem;

    .login-title {
        text-align: center;
    }

    .login-form-content {
        .login-form-item {
            width: 18.75rem;
            margin: 0 auto;
            margin-bottom: 1.25rem;
        }

        .login-btn {
            margin: 0 auto;
            margin-top: 1.25rem;
            margin-bottom: 1.875rem;
            width: 17.5rem;
        }
    }
}
</style>