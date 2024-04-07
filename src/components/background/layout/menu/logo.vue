<template>
    <div class="logo">
        <img class="logo-img" src="@/assets/images/logo_1.png" alt="">
        <span class="logo-title">校园服务平台管理系统</span>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
</script>

<style lang='scss' scoped>
.logo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .logo-img {
        width: 30%;
    }

    .logo-title {}
}

@media screen and (max-width: 1200px) {
    .logo {
        .logo-img {
            width: 60%;
        }

        .logo-title {
            display: none;
        }
    }


}
</style>
