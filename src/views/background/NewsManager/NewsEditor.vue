<template>
    <div style="width: 100%" ref="NewsEditor">
        <WangEditor />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import WangEditor from '@/components/background/richtext/WangEditor.vue'
const NewsEditor = ref()

</script>

<style lang='scss' scoped></style>
