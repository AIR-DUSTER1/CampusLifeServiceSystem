<script lang="ts">
export default {
    name: "backmenu",
}
</script>
<template>
    <div class="menu-demo">
        <a-menu :style="{ height: '100%' }" v-for="item in menuList" :key="item.id" theme="light" :collapsed="collapsed"
            accordion breakpoint="xl">
            <a-sub-menu key="0">
                <template #icon>
                    <component :is="item.icon" />
                </template>
                <template #title>Navigation 1</template>
                <a-menu-item>Menu 1</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="1">
                <template #icon><icon-bug></icon-bug></template>
                <template #title>Navigation 2</template>
                <a-menu-item key="1_0">Menu 1</a-menu-item>
                <a-menu-item key="1_1">Menu 2</a-menu-item>
                <a-menu-item key="1_2">Menu 3</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="2">
                <template #icon><icon-bulb></icon-bulb></template>
                <template #title>Navigation 3</template>
                <a-menu-item key="2_0">Menu 1</a-menu-item>
                <a-menu-item key="2_1">Menu 2</a-menu-item>
                <a-sub-menu key="2_2" title="Navigation 4">
                    <a-menu-item key="2_2_0">Menu 1</a-menu-item>
                    <a-menu-item key="2_2_1">Menu 2</a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
        </a-menu>
        <!-- <a-menu :style="{ height: '100%' }" v-for="item in  menuList " :key="item.id" theme="light" :collapsed="collapsed"
            accordion breakpoint="xl"> -->
        <!-- 一级菜单 -->
        <!-- <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.id"
                :title="`${item.icon ? <a-icon type =" item.icon" /> : ''} ${item.title}`"> -->
        <!-- 子菜单项 -->
        <!-- <a-menu-item v-for=" child  in  item.children " :key=" child.id " @click="handleMenuItemClick(child)">
                {{ child.title }}
            </a-menu-item>
            </a-sub-menu> -->

        <!-- 无子菜单的一级菜单 -->
        <!-- <a-menu-item v-else :key=" item.id " @click="handleMenuItemClick(item)">
                {{ item.title }}
            </a-menu-item>
        </a-menu> -->
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { get } from '@/api/api';
import { onMounted } from 'vue';
import { Message, Result } from '@arco-design/web-vue';
import { reactive } from 'vue';
let collapsed = defineModel()
let menuList = reactive([
])
onMounted(() => {
    get(
        "/column/list",
    )
        .then((res: any) => {
            menuList = res.data
        })
        .catch((err) => {
            Message.error(err.message)
        })
})
</script>
<style lang="scss" scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    // background-color: #232324;
}
</style>