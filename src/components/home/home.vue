<template>
    <div class="login">
        <a-row class="grid-login">
            <a-col class="login-image" flex="2">
                <div class="login-image-text">
                    酒店管理系统
                </div>
            </a-col>
            <div class="login-form">
                <div class="login-form-outside">
                    <Login v-if="isLogin" ref="is"></Login>
                    <Register v-else></Register>
                </div>
            </div>
        </a-row>
    </div>
</template>
<script lang="ts" setup>
import Login from './login.vue';
import Register from './register.vue';
import { ref } from "vue";
let is = ref();
let isLogin = ref(true);



</script>
<style lang="scss" scoped>
.login {
    background-image: url("@/assets/images/hotel.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    .grid-login {
        height: 100vh;

        .login-image {
            margin: 1.875rem;

            .login-image-text {
                font-size: 2.25rem;
                font-weight: bold;
                color: #ddd;
                text-align: left;
            }
        }

        .login-form {
            background-color: #DCDCDC;
            margin-top: 12.5rem;
            margin-right: 12rem;
            border-radius: 30px;
            width: 25rem;

            .login-form-outside {
                position: relative;
            }
        }
    }
}
</style>