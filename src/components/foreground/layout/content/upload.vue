<template>
    <a-upload list-type="picture-card" accept="image/png, image/jpeg" action="/" success :default-file-list="fileList"
        image-preview />
</template>

<script setup lang='ts'>
import { post } from '@/api/api'
const fileList: any[] = [

];
function success() {

}
</script>

<style lang='scss' scoped></style>
