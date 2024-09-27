<template>
    <RouterView></RouterView>
</template>
<script lang="ts" setup>
import { inject } from '@vercel/analytics'
inject()
</script>
<style lang="scss" scoped></style>
