<template>
    <!-- 弹出框组件，根据editor值展示不同的表单或提示 -->
    <a-modal :ok-loading="loading" v-model:visible="visible">
        <!-- 自定义标题区域，支持插槽传入特定内容或显示默认标题 -->
        <template #title>
            <slot name="alert" v-if="editor === editorOption.deleteRole"></slot>
            {{ title }}
        </template>

        <!-- 编辑角色表单 -->
        <a-form :model="form" v-if="editor === editorOption.editRole">
            <!-- 角色名称输入框，必填 -->
            <a-form-item asterisk-position="start" field="name" required>
                <template #label>
                    <span class="ant-form-item-required">角色名称</span>
                </template>
                <a-input v-model="form.name" placeholder="请输入角色名称，如：系统管理员" />
            </a-form-item>

            <!-- 角色类型输入框，必填 -->
            <a-form-item asterisk-position="start" field="code" required>
                <template #label>
                    <span class="ant-form-item-required">角色类型</span>
                </template>
                <a-input v-model="form.code" placeholder="请输入角色类型英文名，如：admin" />
            </a-form-item>

            <!-- 描述输入框 -->
            <a-form-item field="updateTime">
                <template #label>
                    <span class="ant-form-item-required">更新时间</span>
                </template>
                <a-input disabled v-model="form.updateTime" placeholder="系统生成值" />
            </a-form-item>
        </a-form>

        <!-- 删除确认提示 -->
        <div class="alert" v-else-if="editor === editorOption.deleteRole">
            <div>是否要删除“<span style="color: rgb(var(--red-7));">{{ form.name }}</span>”角色?</div>
        </div>

        <!-- 菜单权限组件 -->
        <div v-else-if="editor === editorOption.roleMenu">
            <roletree v-model:id="form.id"></roletree>
        </div>

        <!-- 底部操作按钮 -->
        <template #footer>
            <div class="modalfooter">
                <a-button class="button" @click="handleCancel">取消</a-button>
                <!-- 删除按钮，仅当编辑模式为2时显示 -->
                <a-button class="button" type="primary" status="danger" v-if="editor === editorOption.deleteRole"
                    @click="handleBeforeOk">删除</a-button>
                <!-- 确认按钮，编辑模式不为2时显示 -->
                <a-button class="button" type="primary" v-else @click="handleBeforeOk">确认</a-button>
            </div>
        </template>
    </a-modal>
</template>

<script setup lang='ts'>
import { shallowRef, reactive, watch, onMounted, ref, toRaw, computed } from 'vue';
import roletree from '@/components/background/modal/roletree.vue'; // 导入角色树组件
import { post, del, put } from '@/api/api'; // HTTP请求方法
import { Message } from '@arco-design/web-vue'; // 消息提示组件
import useUserStore from '@/stores/modules/user'; // 用户信息仓库
// 定义响应式变量与引用
let title = shallowRef<string>();
let visible = defineModel<boolean>('visible');
let editor = defineModel<number>('editor');
let backform = defineModel<any>('backform');
let emit = defineEmits(['regetrolelist']);
let loading = shallowRef(false);
let userStore = useUserStore();
const userInfo = computed(() => userStore.userinfo)
let form = reactive<any>({
    id: 0,
    name: '',
    code: '',
    addrole: false,
    updateTime: ''
});
const editorOption = {
    editRole: 1,
    deleteRole: 2,
    roleMenu: 3
}
// 生命周期钩子，初始化表单数据
onMounted(() => {
    form = backform.value
    if (editor.value == editorOption.editRole && form.addrole) {
        title.value = '添加角色';
    }
});

// 监听editor变化，动态设置标题
watch(editor, (value) => {
    switch (value) {
        case 1:
            title.value = '编辑角色';
            break;
        case 2:
            title.value = '提示';
            break;
        case 3:
            title.value = '菜单权限';
            break;
    }
});

// 处理确认按钮点击事件，执行不同逻辑依据editor的值
const handleBeforeOk = () => {
    // 根据editor值执行不同操作：创建/更新角色、删除角色或处理其他情况
    // 包含错误处理和消息提示
    if (editor.value == editorOption.editRole && form.addrole) {
        post(
            '/user/role',
            {
                code: form.code,
                name: form.name
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('添加成功')
                emit('regetrolelist')
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err.message)
        })
    } else if (editor.value == editorOption.editRole && !form.addrole) {
        put(
            `/user/role/${form.id}`,
            {
                code: form.code,
                name: form.name
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                emit('regetrolelist')
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((res) => {
            Message.error(res.message)
        })
    } else if (editor.value == editorOption.deleteRole) {
        del(
            `/user/role/${form.id}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                emit('regetrolelist')
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err.message)
        })
    }

};

// 取消按钮点击事件，关闭弹窗
const handleCancel = () => {
    visible.value = false;
};
</script>

<style lang='scss' scoped>
// 自定义样式
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