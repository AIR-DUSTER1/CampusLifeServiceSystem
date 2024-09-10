<template>
    <div v-if="match && match[0] == 40" class="result">
        <a-result :status="status" :subtitle="subtitle">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="router.back()">Back</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
    <div v-else-if="status == 500" class="result">
        <a-result :status="status" :subtitle="subtitle">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="router.go(-2)">Back</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let status: any = router.currentRoute.value.query.status
let subtitle = ref()
const match = ref(status.match(/40/g))
onMounted(() => {
    if (status == 403) {
        subtitle.value = "拒绝访问服务器上的此资源。"
    } else if (status == 404) {
        subtitle.value = "哎呀，那一页没了。"
    } else if (status == 500) {
        subtitle.value = "此页面无法正常工作。"
    }
})
</script>

<style lang='scss' scoped>
.result {}
</style>
