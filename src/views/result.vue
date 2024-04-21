<template>
    <div v-if="status == 403" class="result">
        <a-result status="403" subtitle="拒绝访问服务器上的此资源。">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="$router.back()">Back</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
    <div v-else-if="status == 404" class="result">
        <a-result status="404" subtitle="哎呀，那一页没了。">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="$router.back()">Back</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
    <div v-else-if="status == 500" class="result">
        <a-result status="500" subtitle="此页面无法正常工作。">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="$router.go(-2)">Back</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>

<script setup lang='ts'>
import router from '@/router';
let status: any = router.currentRoute.value.query.status

</script>

<style lang='scss' scoped>
.result {}
</style>
