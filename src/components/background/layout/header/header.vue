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
        </a-page-header>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watch, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import avatar from '@/components/common/avatar.vue'
import { useBrowserLocation } from '@vueuse/core'
const route = useRoute()
const router = useRouter()
let url = shallowRef()
watch(route, () => {
    url.value = useBrowserLocation().value.pathname
    console.log(route);

})
onMounted(() => {
    url.value = useBrowserLocation().value.pathname
})



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