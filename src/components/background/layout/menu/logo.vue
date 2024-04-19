<template>
    <div class="logo">
        <img class="logo-img" ref="logoimg" src="@/assets/images/logo_1.png" alt="">
        <span class="logo-title" ref="logotitle">校园服务平台管理系统</span>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { watch } from 'vue';
let collapsed = defineModel<boolean>()
const { width } = useWindowSize()
let logotitle = ref()
let logoimg = ref()
watch(collapsed, () => {
    if (collapsed.value == true) {
        logotitle.value.style.display = 'none'
        logoimg.value.style.width = "60%"

    } else if (collapsed.value == false) {
        logotitle.value.style.display = 'block'
        logoimg.value.style.width = "30%"
    } else {

    }
})
</script>

<style lang='scss' scoped>
.logo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .logo-img {
        margin-top: 5px;
        width: 30%;
        z-index: 1;
    }

    .logo-title {
        animation: transitionAnimation .5s ease-in-out;
    }
}

@media screen and (max-width: 1200px) {
    .logo {
        .logo-img {
            width: 60%;
        }

        .logo-title {
            display: none;
            animation: transitionAnimation .4s ease-in-out;
        }
    }


}

@keyframes transitionAnimation {
    0% {
        transform: translateX(-200px);
        opacity: 0;
        z-index: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;

    }
}

@keyframes fall {
    0% {
        transform: translateY(-10px);
    }

    80% {
        transform: translateY(-5px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>
