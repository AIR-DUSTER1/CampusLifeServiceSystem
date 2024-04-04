<template>
    <a-card class="footer-container" :bordered="false"> Copyright © {{ projectName }} 2023 </a-card>
</template>

<script lang="ts" setup>
import { projectName } from '@/setting/setting'
projectName


</script>

<style lang="less" scoped>
.footer-container {
    height: @footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
</style>