<script lang="ts">
export default {
    name: "backfooter",
}
</script>
<template>
    <a-card class="footer-container" :bordered="false"> Copyright © {{ projectName }} 2024 </a-card>
</template>

<script lang="ts" setup>
import { projectName } from '@/setting/setting'
projectName


</script>

<style lang="scss" scoped>
.footer-container {
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-top: 0.8px solid rgb(229, 230, 235);
}
</style>