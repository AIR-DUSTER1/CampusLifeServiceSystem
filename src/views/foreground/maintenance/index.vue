<template>
    <a-list>
        <template #header>
            报修
        </template>
        <a-list-item v-for="item in itemlist" :key="item.title" :to="item.path">
            {{ item.title }}
            <template #extra>
                >
            </template>
        </a-list-item>
    </a-list>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
let itemlist = reactive([
    {
        title: "报修申请",
        path: "/foreground/LifeService/maintenance/apply"
    },
    {
        title: "我的申请",
        path: "/foreground/LifeService/maintenance/myApply"
    }
])
</script>

<style lang='scss' scoped></style>
