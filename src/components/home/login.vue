<template>
    <h1 class="login-title">登录</h1>
    <a-form class="login-form-content" :model="form" :rules="rules" layout="vertical">
        <a-form-item class="login-form-item" field="name" label="用户名">
            <a-input v-model="form.name" placeholder="请输入你的用户名..." />
        </a-form-item>
        <a-form-item class="login-form-item" field="password" label="密码" validate-trigger="blur">
            <a-input-password v-model="form.password" placeholder="请输入你的密码..." />
        </a-form-item>
        <a-form-item>
            <a-button shape="round" @click="register" class="login-btn">登录</a-button>
        </a-form-item>
    </a-form>
    <div class="register-btn"><img src="@/assets/images/register.png" alt=""></div>

</template>

<script lang="ts" setup>
import router from '@/router';
import { useCounterStore } from "@/stores/counter"
import { reactive, ref } from 'vue';
import { post } from "@/api/api";

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
let isLogin = ref(true);
function register() {
    isLogin.value = !isLogin.value;
    post("/user/login", { name: form.name, password: form.password }).then(res => {
        console.log(res);

        if (res.code == 200) {
            const store = useCounterStore();
            // store.setUserInfo(res.data);
            console.log("111");

            router.push('/');
        } else {
            // alert(res.msg);
            console.log("222");

            // console.log(res.msg);
        }
    })
}
</script>
<style lang="scss" scoped>
.login-title {
    text-align: center;
    margin-top: 0;
    padding-top: .9375rem;
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

.register-btn {
    position: absolute;
    right: 0%;
    top: 0%;
    width: 5rem;
    height: 5rem;
    text-align: right;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>