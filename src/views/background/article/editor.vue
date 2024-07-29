<template>
    <div style="width: 100%">
        <WangEditor />
        <div style="display: flex;flex-direction: row;margin-top: .5rem;">
            <span>附件：</span>
            <upload v-model:type="type" v-model:address="address" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import upload from '@/components/background/upload/upload.vue'
import WangEditor from '@/components/background/richtext/WangEditor.vue'

let type = ref('.xlsx,.pdf,.doc,.docx,.txt,.7z,.zip,.rar,.ppt,.pptx')
let address = ref('#')

</script>

<style lang='scss' scoped></style>
