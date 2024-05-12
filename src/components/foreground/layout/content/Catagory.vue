<template>
    <div>
        <a-card class="card" hoverable>
            <template #title>
                <slot></slot>
            </template>
            <template #extra>
                <slot name="newsbutton"></slot>
                <slot name="noticebutton"></slot>
            </template>
            <template #cover>
                <slot name="news"></slot>
                <slot name="notice"></slot>
            </template>
        </a-card>
    </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
.card {
    width: 98%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 5px;
}
</style>
