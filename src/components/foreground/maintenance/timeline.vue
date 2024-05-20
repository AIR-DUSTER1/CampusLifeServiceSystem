<template>
    <div :style="{ display: 'flex' }">
        <a-timeline :style="{ marginRight: '40px' }">
            <a-timeline-item label="2020-04-12">
                <template #dot>
                    <IconCheck :style="{
        fontSize: '12px',
        padding: '2px',
        boxSizing: 'border-box',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary-light-1)',
    }" />
                </template>
                The first milestone
            </a-timeline-item>
            <a-timeline-item label="2020-05-17">
                <template #dot>
                    <IconCheck :style="{
        fontSize: '12px',
        padding: '2px',
        boxSizing: 'border-box',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary-light-1)',
    }" />
                </template>
            </a-timeline-item>
            <a-timeline-item label="2020-06-22">The third milestone</a-timeline-item>
            <a-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
                The third milestone
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

</script>

<style lang='scss' scoped></style>
