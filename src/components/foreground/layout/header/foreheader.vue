<script lang="ts">
export default {
    name: "foreheader",
}
</script>
<template>
    <div class="drawer">
        <drawer></drawer>
    </div>
    <div class="avatar">
        <avatar></avatar>
    </div>
</template>

<script setup lang='ts'>
import drawer from '@/components/foreground/layout/header/drawer.vue'
import avatar from '@/components/common/avatar.vue';
</script>

<style lang='scss' scoped>
.drawer {
    width: 32px;
    margin-left: 10px;
}

.avatar {
    margin-right: 10px
}
</style>
