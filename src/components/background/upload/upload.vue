<template>
    <div>
        <a-upload :action="address" multiple :limit="3" :accept="type" :fileList="filelist ? [filelist] : []"
            :show-file-list="false" :on-before-remove="handleRemoveFile" @before-upload="beforeUpload"
            @progress="progress" @success="success" @error="error">
        </a-upload>
        <a-alert type="error" v-if="typer">{{ '文件格式不正确，请上传' + type + '格式文件' }}</a-alert>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { post, get, put } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import md5 from '@/utils/md5'
let address = defineModel<string>('address')
let type = defineModel<string>('type')
let filelist = ref<any>()
let typer = ref<boolean>(false)
function handleRemoveFile(file: any) {
    console.log(file);
}
function beforeUpload(file: any) {
    filelist.value = file
    let typelist: any = []
    let filetype = file.name.split('.').pop()
    type.value!.split(',').forEach(item => {
        item = item.replace(/\./g, '')
        typelist.push(item)
    })
    if (!typelist.includes(filetype)) {
        typer.value = true
    }
    if (file.size >= 1024 * 1024 * 20) {
        Message.error('文件大小不能超过20M')
        return false
    } else {
        md5(file).then((res) => {
            console.log(res);
        })
        console.log(file);
        return true
    }

}
function progress(file: any, ev: any) {
    console.log(file, ev);
}
function success(file: any) {
    console.log(file);
}
function error(file: any) {
    console.log(file);
}
</script>

<style lang='scss' scoped>
.button-upload {
    :deep(.arco-btn-icon) {
        margin: 0;
    }
}
</style>
