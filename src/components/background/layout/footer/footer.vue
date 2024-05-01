<script lang="ts">
export default {
    name: "backfooter",
}
</script>
<template>
    <span style="position: fixed; bottom: 0;">
        <a-card class="footer-container"> Copyright © {{ projectName }} 2024 </a-card>
    </span>
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
}
</style>