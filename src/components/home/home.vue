<template>
    <div class="login">
        <a-row class="grid-login">
            <a-col class="login-image" flex="2">
                <div class="login-image-text">
                    酒店管理系统
                </div>
            </a-col>
            <Login></Login>
        </a-row>
    </div>
</template>
<script lang="ts" setup>
import Login from './login.vue';
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
    }

}
</style>