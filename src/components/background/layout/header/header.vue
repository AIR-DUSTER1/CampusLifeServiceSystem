<script lang="ts">
export default {
    name: "backheader",
}
</script>
<template>
    <div class="header">
        <a-page-header class="header-content" :show-back="false">
            <template #breadcrumb>
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="item in route.matched" :key="item.path">
                        {{ item.meta.title }}
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </template>
            <template #extra>
                <avatar></avatar>
            </template>
            <span class="tabs"><tabs></tabs></span>
        </a-page-header>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watch, shallowRef } from 'vue'
import { useRoute } from 'vue-router';
import avatar from '@/components/common/avatar.vue'
import Tabs from '@/components/background/layout/header/tabs.vue'
const route = useRoute()
</script>
<style lang="scss" scoped>
.header {
    background-color: white;
    border-bottom: 0.8px solid rgb(229, 230, 235);
    :deep(.arco-page-header-with-breadcrumb){
        padding-bottom: 0;
    }
    .header-content {

        :deep(.arco-page-header-wrapper) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        :deep(.arco-page-header-content){
            padding: 0;
        }
    }
}
</style>