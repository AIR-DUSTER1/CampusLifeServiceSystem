<script lang="ts">
export default {
    name: "forecontent",
}
</script>
<template>
    <div class="forecontent">
        <a-grid :cols="{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }" :colGap="2" :rowGap="2" class="grid-app">
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
        </a-grid>
        <Catagory>
            <span>校园新闻</span>
            <template #news>

            </template>
        </Catagory>
        <Catagory>
            <span>通知公告</span>
            <template #notice>

            </template>
        </Catagory>
    </div>
</template>

<script setup lang='ts'>
import Catagory from '@/components/foreground/layout/content/Catagory.vue'

</script>

<style lang='scss' scoped>
.forecontent {
    width: 100%;

    .grid-app {
        .app-item {
            height: 56px;
            line-height: 48px;
            color: var(--color-white);
            background-color: goldenrod;
            text-align: center;
        }
    }
}

.grid-demo .arco-col>div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.grid-demo .arco-col:nth-child(2n)>div {
    background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo .arco-col:nth-child(2n + 1)>div {
    background-color: var(--color-primary-light-4);
}

.grid-demo-grid {
    width: 100%;

}

.grid-demo-grid .demo-item {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
}
</style>
