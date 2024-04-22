<template>
    <a-modal :ok-loading="loading" v-model:visible="visible">
        <template #title>
            <slot name="alert" v-if="editor == 2"></slot>
            {{ title }}
        </template>
        <a-form :model="form" v-if="editor == 1">
            <a-form-item asterisk-position="start" field="rolename" required>
                <template #label>
                    <span class="ant-form-item-required">角色名称</span>
                </template>
                <a-input v-model="form.rolename" placeholder="请输入角色名称，如：系统管理员" />
            </a-form-item>
            <a-form-item asterisk-position="start" field="type" required>
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
            <roletree v-model:id="form.id"></roletree>
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
import { shallowRef, reactive, watch, onMounted, ref, toRaw } from 'vue'
import roletree from '@/components/background/modal/roletree.vue'
import { post, del, put } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
let title = shallowRef<string>()
let visible = defineModel<boolean>('visible')
let editor = defineModel<number>('editor')
let backform = defineModel<object>('backform')
let emit = defineEmits(['regetrolelist'])
let loading: boolean = false
let userStore = useUserStore()
let userInfo = userStore.getUserInfo()
let form = reactive<any>({
    id: '',
    rolename: '',
    type: '',
    description: ''
})
onMounted(() => {
    form = backform.value
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
const handleBeforeOk = () => {
    if (editor.value == 1 && (form.rolename == '' || form.type == '')) {
        Message.error("角色名称或角色类型不能为空")
    } else if (editor.value == 1 && form.rolename != '' && form.type != '') {
        console.log(backform.value, form.description);
        loading = true
        post(
            '/console/role',
            {
                "description": form.description,
                "rolename": form.rolename,
                "type": form.type
            },
            {
                headers: { "token": userInfo.token }
            }
        ).then((res) => {
            if (res.message == null) {
                Message.success("操作成功")
                form.rolename = ''
                form.type = ''
                form.description = ''
                emit('regetrolelist')
                loading = false
                visible.value = false
            } else {
                if (res.message == "角色已存在") {
                    put(
                        '/console/role',
                        toRaw(form),
                        { headers: { "token": userInfo.token } }
                    ).then((res) => {
                        Message.success("操作成功")
                        emit('regetrolelist')
                        loading = false
                        visible.value = false
                    })
                } else {
                    Message.error("操作失败" + res.message)
                    loading = false
                }
            }
        }).catch((err) => {
            Message.error("操作失败" + err.message)
            loading = false
            return false
        })
    } else if (editor.value == 2) {
        del(
            '/console/role',
            { "token": userInfo.token },
            {
                id: form.id
            }
        ).then(() => {
            Message.success("操作成功")
            emit('regetrolelist')
            loading = false
            visible.value = false
        }).catch(() => {
            Message.error("操作失败")
            loading = false
            return false
        })
    } else if (editor.value == 3) {

    }
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
