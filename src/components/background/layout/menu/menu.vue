<template>
    <div class="menu-demo">
        <a-menu :style="{ height: '100%' }" theme="light" accordion breakpoint="xl">
            <a-sub-menu key="0">
                <template #icon><icon-apps></icon-apps></template>
                <template #title>Navigation 1</template>
                <a-menu-item key="0_0">Menu 1</a-menu-item>
                <a-menu-item key="0_1">Menu 2</a-menu-item>
                <a-menu-item key="0_2">Menu 3</a-menu-item>
                <a-menu-item key="0_3">Menu 4</a-menu-item>
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
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

// onCollapse(val, type){
//     const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩'

// }

</script>
<style lang="scss" scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    // background-color: #232324;
}
</style>