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
            <a-scrollbar type="embed" style="height: 87vh;width: 100%;overflow-y: auto;"
                outer-class="background-layout-content">
                <a-card class="content-card">
                    <div ref="content">
                        <RouterView></RouterView>
                    </div>
                </a-card>
                <Footer v-model:footerposition="footerposition" v-model:collapsed="collapsed"></Footer>
            </a-scrollbar>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import Header from "@/components/background/layout/header/header.vue"
import Menu from "@/components/common/menu.vue"
import Logo from "@/components/background/layout/menu/logo.vue"
import Footer from "@/components/background/layout/footer/footer.vue"
import { ref, shallowRef, onMounted, watch, reactive } from "vue"
import { useElementSize } from '@vueuse/core'
let margin = shallowRef()
let collapsed = ref()
let content = ref()
const { height } = useElementSize(content)
let footerposition = ref();
onMounted(() => {
    getmargin()
})
watch(() => height.value, (value) => {
    if (value > 580) {
        footerposition.value = 'relative'
    } else {
        footerposition.value = 'fixed'
    }
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
    background-color: rgb(233, 240, 254);

    .background-layout-sider {
        position: fixed;
        height: 100vh;
        z-index: 2;
    }

    .background-layout-header {
        position: relative;
        margin-left: v-bind(margin);
        z-index: 1;
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
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

        :deep(.arco-card-body) {
            padding: 10px;
        }
    }
}
</style>
