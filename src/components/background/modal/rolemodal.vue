<template>
    <a-modal v-model:visible="visible">
        <template #title>
            <slot name="alert" v-if="editor == 2"></slot>
            {{ title }}
        </template>
        <a-form :model="form" v-if="editor == 1">
            <a-form-item asterisk-position="start" field="name" required>
                <template #label>
                    <span class="ant-form-item-required">角色名称</span>
                </template>
                <a-input v-model="form.rolename" placeholder="请输入角色名称，如：系统管理员" />
            </a-form-item>
            <a-form-item asterisk-position="start" field="post" required>
                <template #label>
                    <span class="ant-form-item-required">角色类型</span>
                </template>
                <a-input v-model="form.type" placeholder="请输入角色类型英文名，如：admin" />
            </a-form-item>
            <a-form-item field="description">
                <template #label>
                    <span class="ant-form-item-required">描述</span>
                </template>
                <a-input v-model="form.description" placeholder="描述角色信息" />
            </a-form-item>
        </a-form>

        <div class="alert" v-else-if="editor == 2">
            <div>是否要删除此角色?</div>
        </div>
        <div v-else-if="editor == 3">
            <roletree></roletree>
        </div>
        <template #footer>
            <div class="modalfooter">
                <a-button class="button" @click="handleCancel">取消</a-button>
                <a-button class="button" type="primary" status="danger" v-if="editor == 2"
                    @click="handleBeforeOk">删除</a-button>
                <a-button class="button" type="primary" v-else @click="handleBeforeOk">确认</a-button>
            </div>
        </template>
    </a-modal>
</template>

<script setup lang='ts'>
import { shallowRef, reactive, watch, onMounted, ref } from 'vue';
import roletree from '@/components/background/modal/roletree.vue'
let title = shallowRef<string>()
let visible = defineModel<boolean>('visible')
let editor = defineModel<number>('editor')
let backform = defineModel<object>('backform')
let form = reactive<any>({
    rolename: '',
    type: '',
    description: ''
})
onMounted(() => {
    form = backform
})
watch(editor, (value) => {
    if (value == 1) {
        title.value = '编辑角色'
    } else if (value == 2) {
        title.value = '提示'
    } else if (value == 3) {
        title.value = '菜单权限'
    }
})
const handleBeforeOk = (done: any) => {
    console.log(form)
    window.setTimeout(() => {
        done()
    }, 3000)
}
const handleCancel = () => {
    visible.value = false;
}
</script>

<style lang='scss' scoped>
.alert {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.modalfooter {
    display: flex;
    justify-content: center;

    .button {
        margin: 10px;
    }
}
</style>
