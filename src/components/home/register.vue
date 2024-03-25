<template>
    <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead">
            我已阅读并同意相关条款和隐私条款
        </a-checkbox>
    </a-form-item>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const form = reactive({
    isRead: false,
})
</script>
<style lang="scss" scoped></style>