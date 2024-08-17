<template>
    <div class="menu-demo">
        <!-- 菜单 -->
        <a-menu v-if="flag" theme="light" :selected-keys="[route.path]" :collapsed="collapsed" accordion
            breakpoint="xl">
            <template v-for="(item, index) in  menuList " :key="item.mid">
                <!-- 一级菜单 -->
                <a-sub-menu v-if="item.children && item.children?.length > 0" :key="item.path">
                    <template #icon>
                        <!-- <component :is="item.icon" /> -->
                    </template>
                    <template #title>{{ item.name }}</template>
                    <!-- 子菜单项 -->
                    <a-menu-item v-for="child in item.children" @click="handleMenuItemClick(child)" :key="child.path">
                        {{ child.name }}
                    </a-menu-item>
                </a-sub-menu>
                <!-- 无子菜单的一级菜单 -->
                <a-menu-item v-if="item.children?.length == 0" @click="handleMenuItemClick(item)" :key="item.path">
                    <!-- <component :is="item.icon" /> -->
                    {{ item.name }}
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useRoute } from 'vue-router'
let collapsed = defineModel('collapsed')
let flag = defineModel('flag')
let menuList = defineModel<any>('menuList')
const route = useRoute()
function handleMenuItemClick(item: any) {
    router.push(item.path)
}
</script>
<style lang="scss" scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    // background-color: #232324;
}
</style>