<template>
    <div style="width: 100%;">
        <a-typography-title :heading="3" style="margin: 0;text-align: center;">
            个人信息
        </a-typography-title>
        <a-form :model="info">
            <a-row justify="center" align="center">
                <a-col :span="12">
                    <a-form-item field="avatar" label="头像:" label-col-flex="100px">
                        <a-avatar trigger-type="mask" @click="browserUpload">
                            <img alt="avatar" :src="store.avatar" />
                            <template #trigger-icon>
                                <IconEdit />
                            </template>
                        </a-avatar>
                    </a-form-item>
                    <Cropper ref="clipperRef" :type="clipperData.type" :allow-type-list="clipperData.allowTypeList"
                        :limit-size="clipperData.limitSize" :fixed-number="clipperData.fixedNumber"
                        :fixed-number-aider="clipperData.fixedNumberAider" :preview-width="clipperData.previewWidth"
                        @confirm="onConfirm" />
                </a-col>
                <a-col :span="12">
                    <a-form-item field="username" label="用户名:" label-col-flex="88px">
                        <a-input v-model="info.username" placeholder="请输入名称" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item field="number" label="工号:" label-col-flex="100px">
                        <a-input disabled v-model="info.number" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item class="select" field="sex" label="性别:" label-col-flex="80px">
                        <a-select :default-value="info.sex" v-model="info.sex" placeholder="请选择性别:"
                            @change="selectChange">
                            <a-option class="select-item" value="男">男</a-option>
                            <a-option class="select-item" value="女">女</a-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item field="phone" label="手机号:" label-col-flex="100px">
                        <a-input disabled v-model="info.phone" placeholder="请输入手机号" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="mail" label="邮箱:" label-col-flex="80px">
                        <a-input disabled v-model="info.email" placeholder="请输入邮箱" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item field="department" label="院系:" label-col-flex="100px">
                        <a-input v-model="info.department" placeholder="" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="idNumber" label="身份证:" label-col-flex="80px">
                        <a-input v-model="info.idNumber" placeholder="" disabled />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16" justify="center">
                <a-button type="primary" @click="saveinfo">保存</a-button>
                <a-button style="margin-left: 60px;" type="primary" @click="form = !form">返回</a-button>
            </a-row>
        </a-form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onUnmounted, computed, toRaw } from 'vue'
import useUserStore from '@/stores/modules/user'
import Cropper from '@/components/background/Cropper/Cropper.vue'
import { post, put } from '@/api/api'
import { Message } from '@arco-design/web-vue';
interface IClipper {
    type: string // 上传类型
    allowTypeList: string[] // 接收允许上传的图片类型
    limitSize: number // 限制大小
    fixedNumber: number[] // 截图框的宽高比例
    fixedNumberAider?: number[] // 侧边栏收起截图框的宽高比例
    previewWidth: number // 预览宽度
    previewWidthAider?: number // 侧边栏收起预览宽度
}
let clipperRef = ref()
const clipperData = ref<IClipper>({
    type: '',
    allowTypeList: [],
    limitSize: 1,
    fixedNumber: [],
    previewWidth: 0
})
let form = defineModel('form')
const store = useUserStore()
const userinfo = computed(() => store.userinfo)
const info = reactive({
    uid: userinfo.value.uid,
    number: userinfo.value.number,
    sex: userinfo.value.sex,
    username: userinfo.value.username,
    avatar: userinfo.value.avatar,
    email: userinfo.value.email,
    phone: userinfo.value.phone,
    department: userinfo.value.department,
    idNumber: userinfo.value.idNumber
})

const browserUpload = (): void => {
    clipperData.value = {
        type: 'browserLogo', // 该参数可根据实际要求修改类型
        allowTypeList: ['png', 'jpg', 'jpeg'], // 允许上传的图片格式
        limitSize: 1, // 限制的大小
        fixedNumber: [1, 1],  // 截图比例，可根据实际情况进行修改
        previewWidth: 100 // 预览宽度
    }
    // 打开裁剪组件
    clipperRef.value.uploadFile()
}

/* 保存logo自定义事件, 实际业务在此编写 */
const onConfirm = (val: any): void => {
    if (val != null && val != undefined && val != '') {
        store.UploadAvatar(val.url)
        info.avatar = val.url
    }
    console.log(val, '点击保存按钮后的图片信息')
}
function saveinfo() {
    // console.log(info);
    put(
        `/user/${info.uid}`,
        toRaw(info),
        { Authorization: 'Bearer ' + userinfo.value.access_token }
    ).then(res => {
        if (res.message != null) {
            Message.error(res.message)
        } else {
            store.saveUser(info)
            Message.success('修改成功')
            form.value = !form.value
        }
    })
}
function selectChange(value: any) {
    info.sex = value
    // store.SaveSex(value)
    // console.log(value);
}
</script>

<style lang='scss' scoped>
.select {
    :deep(.arco-select-view-value) {
        justify-content: flex-start;
    }
}
</style>
