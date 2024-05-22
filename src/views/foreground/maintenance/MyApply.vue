<template>
    <div class="my-list">
        <a-typography-title class="mytitle" :heading="4">
            我的申请
        </a-typography-title>
        <a-timeline mode="left" labelPosition="relative" class="timelinelist">
            <a-timeline-item :dotColor="item.dotColor" v-for="item in timelinelist" :key="item.id">
                <template #label>
                    {{ item.label }}
                </template>

            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script setup lang='ts'>
import router from '@/router'
import { reactive, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { height } = useWindowSize()
let listheight = ref(height.value - 60 + "px")
let timelinelist = reactive([
    {
        id: 0,
        label: "2023-12-08",
        dotColor: "#F5222D",
        path: "/foreground/LifeService/maintenance/apply"
    },
])
function applylink(vlaue: string) {
    router.push(vlaue)
}
</script>

<style lang='scss' scoped>
.my-list {
    margin-top: 58px;
    background-color: white;
    height: v-bind(listheight);

    .mytitle {
        margin-left: 20px;
        padding-top: 10px;
    }

    .timelinelist {
        margin-top: 8px;
    }
}
</style>
