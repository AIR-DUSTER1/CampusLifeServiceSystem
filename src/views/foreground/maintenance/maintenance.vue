<template>
    <a-list class="maintenance-list" size="small">
        <template #header>
            <a-typography-title :heading="4" style="margin: 0;">
                报修
            </a-typography-title>
        </template>
        <a-list-item v-for="item in itemlist" :key="item.title" @click="applylink(item.path)">
            {{ item.title }}
            <template #extra>
                <icon-right />
            </template>
        </a-list-item>
    </a-list>
</template>
<script setup lang='ts'>
import router from '@/router'
import { reactive, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { height } = useWindowSize()
let listheight = ref(height.value - 60 + "px")
let itemlist = reactive([
    {
        id: 0,
        title: "报修申请",
        path: "/foreground/LifeService/maintenance/apply"
    },
    {
        id: 1,
        title: "我的申请",
        path: "/foreground/LifeService/maintenance/myapply"
    }
])
function applylink(vlaue: string) {
    router.push(vlaue)
}
</script>

<style lang='scss' scoped>
.maintenance-list {
    margin-top: 58px;
    background-color: white;
    height: v-bind(listheight);
}
</style>
