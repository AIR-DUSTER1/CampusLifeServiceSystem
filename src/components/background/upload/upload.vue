<template>
    <div>
        <a-upload class="upload" :headers="headers" draggable :action="address" multiple :limit="3" :accept="type"
            :fileList="filelist ? [filelist] : []" :show-file-list="true" :on-before-remove="handleRemoveFile"
            @before-upload="beforeUpload" @progress="progress" @success="success" @error="error">
        </a-upload>
        <a-alert type="error" v-if="typer">{{ '文件格式不正确，请上传' + type + '格式文件' }}</a-alert>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { post, get, put } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import md5 from '@/utils/md5'
import useUserStore from '@/stores/modules/user'; // 用户信息仓库
let userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const headers = reactive({
    Authorization: 'Bearer ' + userInfo.value.access_token
})
let address = defineModel<string>('address')
let type = defineModel<string>('type')
let filelist = ref<any>()
let typer = ref<boolean>(false)
const handleRemoveFile = (file: any): Promise<boolean> => {
    console.log(file);
    return new Promise((resolve, reject) => {
        resolve(true)
    })
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
    filelist.value = file
    console.log(file, ev);
}
function success(file: any) {
    filelist.value = file
    console.log(file);
}
function error(file: any) {
    filelist.value = file
    console.log(file);
}
</script>

<style lang='scss' scoped>
.upload {
    width: 99%;

    :deep(.arco-upload-list) {
        width: 99%;
    }
}
</style>
