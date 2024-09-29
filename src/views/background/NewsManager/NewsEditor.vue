<template>
    <a-card>
        <div style="width: 100%" ref="NewsEditor">
            <Suspense>
                <WangEditor />
            </Suspense>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import WangEditor from '@/components/background/richtext/WangEditor.vue'

</script>

<style lang='scss' scoped></style>
