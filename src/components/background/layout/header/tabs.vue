<template>
    <router-view v-slot="{ Component }">
        <KeepAlive :include="['Home']">
            <component :is="Component" />
        </KeepAlive>
    </router-view>
</template>

<script setup lang='ts'>
import { KeepAlive } from 'vue';


</script>

<style lang='scss' scoped></style>
