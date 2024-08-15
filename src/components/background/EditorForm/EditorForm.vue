<template>
    <div>
        <a-form :model="form">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-form-item field="number" label="学号" label-col-flex="100px">
                        <a-input v-model="form.number" placeholder="请输入学号" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="username" label="姓名" label-col-flex="80px">
                        <a-input v-model="form.username" placeholder="请输入姓名" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="email" label="邮箱" label-col-flex="80px">
                        <a-input v-model="form.email" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-form-item field="phone" label="手机号" label-col-flex="100px">
                        <a-input v-model="form.phone" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="sex" label="性别" label-col-flex="80px">
                        <a-input v-model="form.sex" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="idNumber" label="身份证" label-col-flex="80px">
                        <a-input v-model="form.idNumber" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-form-item field="enabled" label="启用" label-col-flex="100px">
                        <a-input v-model="form.enabled" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="locked" label="锁定" label-col-flex="80px">
                        <a-input v-model="form.locked" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, shallowRef, onMounted } from 'vue'
let form = defineModel<any>('form')
function browserUpload() {

}
</script>

<style lang='scss' scoped></style>
