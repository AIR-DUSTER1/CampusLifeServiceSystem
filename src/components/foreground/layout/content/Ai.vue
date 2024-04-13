<template>
    <div>
        <span></span>
        <a-input v-model="text" :style="{ width: '320px' }" placeholder="Please enter something" allow-clear />
        <a-button :click="sendrequest" type="primary">发送</a-button>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { post } from '@/api/api'
let text = ref()
function sendrequest() {
    post("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
        model: "glm-4",
        messages: { "role": "user", "content": text.value }
    }).then((res) => {
        console.log(res);

    })
}
</script>

<style lang='scss' scoped></style>
