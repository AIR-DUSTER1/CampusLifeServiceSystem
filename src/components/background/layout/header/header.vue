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
                    <a-breadcrumb-item>{{ url }}</a-breadcrumb-item>
                </a-breadcrumb>
            </template>
            <template #extra>
                <avatar></avatar>
            </template>
        </a-page-header>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import avatar from '@/components/background/layout/header/avatar.vue'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
let url = location.value.pathname
console.log(location.value.pathname)

const route = useRoute()
const router = useRouter()

</script>
<style lang="scss" scoped>
.header {
    border-bottom: 0.8px solid rgb(229, 230, 235);

    .header-content {

        :deep(.arco-page-header-wrapper) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>