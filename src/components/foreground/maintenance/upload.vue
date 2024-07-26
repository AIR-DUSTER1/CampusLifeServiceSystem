<template>
    <a-upload list-type="picture-card" capture="camera" accept="image/png, image/jpeg" action="/" success
        :default-file-list="fileList" image-preview>
        <template #upload-button>
            <!-- <a-button style="height: 80px;width: 80px;display: flex;    flex-direction: column;">
                <span>上传</span>
            </a-button> -->
        </template>
    </a-upload>
</template>

<script setup lang='ts'>
import { post } from '@/api/api'
const fileList: any[] = [

];
function success() {

}
</script>

<style lang='scss' scoped></style>
