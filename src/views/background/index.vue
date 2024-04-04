<template>
    <div>
        <header></header>
        <menu></menu>
        <content></content>
        <footer></footer>
    </div>
</template>

<script setup lang='ts'>
import header from '@/views/background/layout/header/header.vue'
import menu from '@/views/background/layout/menu/menu.vue'
import content from '@/views/background/layout/content/content.vue'
import footer from '@/views/background/layout/footer/footer.vue'
import { useUserStoreContext } from '@/stores/modules/user'
const userStore = await useUserStoreContext()
const getUserInfo = userStore.getUserInfo()
</script>

<style lang='scss' scoped></style>
