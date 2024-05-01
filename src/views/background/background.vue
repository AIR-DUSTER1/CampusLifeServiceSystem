<template>
    <a-layout has-sider class="background-layout">
        <a-layout-sider class="background-layout-sider" @collapse="onCollapse" breakpoint="xl" :collapsible="true">
            <transition name="logo">
                <Logo v-model="collapsed"></Logo>
            </transition>
            <Menu v-model:collapsed="collapsed"></Menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="background-layout-header">
                <Header></Header>
            </a-layout-header>
            <a-scrollbar type="embed" style="height: 85vh;width: 100%;overflow: auto;"
                outer-class="background-layout-content">
                <a-card>
                    <RouterView></RouterView>
                </a-card>
                <Footer></Footer>
            </a-scrollbar>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import Header from "@/components/background/layout/header/header.vue"
import Menu from "@/components/common/menu.vue"
import Logo from "@/components/background/layout/menu/logo.vue"
import Content from "@/components/background/layout/content/content.vue"
import Footer from "@/components/background/layout/footer/footer.vue"
import { useUserStoreContext } from "@/stores/modules/user"
import { ref, shallowRef } from "vue"
import { onMounted } from "vue"
let margin = shallowRef()
const userStore = useUserStoreContext()
let collapsed = ref()
onMounted(() => {
    getmargin()
})
function getmargin() {
    if (collapsed.value) {
        margin.value = 48 + 'px'
    } else {
        margin.value = 200 + 'px'
    }
}
function onCollapse(val: boolean, type: string) {
    collapsed.value = val
    getmargin()
    console.log(val, type)
}
</script>

<style lang="scss" scoped>
.background-layout {
    height: 100vh; // 确保布局占据整个视口高度
    display: flex;
    background-color: rgb(233,240,254);
    .background-layout-sider {
        position: fixed;
        height: 100vh;
        z-index: 2;
    }

    .background-layout-header {
        position: relative;
        margin-left: v-bind(margin);
        z-index: 1;
        transition: all 0.3s;
    }

    .background-layout-content {
        height: 85vh;
        max-height: 85vh;
        margin-left: v-bind(margin);
        transition: all 0.3s;
        margin-top: 3px;
        padding: 0 3px;
        z-index: 1;
        flex: none !important;
    }
}
</style>
