<template>
    <div class="header">
        <a-page-header :show-back="false">
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
const route = useRoute()
const router = useRouter()
const breadcrumbs = reactive<Array<DropItem>>([])

interface DropItem {
    label: string
    key: string
    children?: DropItem[]
}
function generatorBreadcrumb() {
    breadcrumbs.length = 0
    const matchedPath = route.matched.map((it) => {
        return {
            label: (it.meta ? it.meta.title || '' : '') as string,
            key: it.path,
        }
    })
    breadcrumbs.push(...matchedPath)
}
onMounted(() => {
    generatorBreadcrumb()
})
watch(
    () => route.path,
    () => {
        if (
            route.path.startsWith('/redirect') ||
            ['/login', '/404', '/405', '/403'].includes(route.path)
        )
            return
        generatorBreadcrumb()
    }
)
</script>
<style lang="scss" scoped>
.header {
    border-bottom: 0.8px solid rgb(229, 230, 235);
}
</style>