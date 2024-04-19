<template>
    <div class="role-manage">
        <div class="addrole">
            <a-button type="primary" @click="addRole">添加角色</a-button>
        </div>
        <a-table :data="data" style="margin-top: 30px" :bordered="{ cell: true }" table-layout-fixed column-resizable
            :pagination="false">
            <template #columns>
                <a-table-column title="角色名称" data-index="rolename">
                </a-table-column>
                <a-table-column title="描述信息" data-index="description"></a-table-column>
                <a-table-column title="操作">
                    <template #cell>
                        <div class="role-button">
                            <a-button type="primary" size="small" @click="handleClick">编辑权限</a-button>
                            <a-button type="primary" status="danger" size="small">删除</a-button>
                        </div>
                    </template>
                </a-table-column>
            </template>
        </a-table>
        <rolemodal v-model="visible"></rolemodal>
    </div>
</template>

<script setup lang='ts'>
import { reactive, shallowRef } from 'vue'
import rolemodal from '@/views/background/RoleManager/rolemodal.vue'
let visible = shallowRef(false)
const columns = reactive([
    {
        title: '角色名称',
        dataIndex: 'rolename',
        width: 200,
    },
    {
        title: '描述信息',
        dataIndex: 'description',
        width: 300,
    },
]);
const data = reactive([{
    key: 'student',
    rolename: '学生',
    description: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
}, {
    key: 'teacher',
    rolename: '教师',
    description: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
}, {
    key: 'admin',
    rolename: '管理员',
    description: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
}]
)
const handleClick = () => {
    visible.value = true;
}
function addRole() {

}
</script>

<style lang='scss' scoped>
.role-manage {
    .addrole {}

}

.role-button {
    text-align: center;
}
</style>
