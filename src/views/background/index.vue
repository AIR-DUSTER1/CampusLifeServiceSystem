<template>
    <a-layout class="background-layout">
        <a-layout-sider class="background-layout-sider" breakpoint="xl" :collapsible="true">
            <transition name="logo">
                <Logo />
            </transition>
            <Menu></Menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <Header></Header>
            </a-layout-header>
            <a-layout style="padding: 0 24px">
                <a-layout-content class="background-layout-content">
                    <Content></Content>
                </a-layout-content>
                <a-layout-footer>
                    <Footer></Footer>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import Header from '@/components/background/layout/header/header.vue'
import Menu from '@/components/background/layout/menu/menu.vue'
import Logo from '@/components/background/layout/menu/logo.vue'
import Content from '@/components/background/layout/content/content.vue'
import Footer from '@/components/background/layout/footer/footer.vue'
import { useUserStoreContext } from '@/stores/modules/user'
import { ref } from 'vue'

const userStore = useUserStoreContext()
const getUserInfo = userStore
</script>

<style lang='scss' scoped>
.background-layout {
    .background-layout-sider {
        height: 100vh;
    }

    .background-layout-content {
        height: 85vh;
        flex: none !important;
    }
}
</style>
