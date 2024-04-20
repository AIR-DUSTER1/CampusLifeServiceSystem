<template>
    <div class="role-manage">
        <div class="addrole">
            <a-button type="primary" size="small" status="success" @click="handleClick(1, addrole)">添加角色</a-button>
        </div>
        <a-table :data="data" style="margin-top: 30px" :bordered="{ cell: true }" table-layout-fixed column-resizable
            :pagination="false">
            <template #columns>
                <a-table-column title="角色名称" data-index="rolename" v-for="{ title, id, dataIndex } in columns"
                    :key="id">
                    <template #title>
                        {{ title }}
                    </template>
                    <template #cell="{ record }">
                        {{ record[dataIndex] }}
                        <div class="role-button" v-if="dataIndex == 'operator'">
                            <a-button class="button" status="success" size="small"
                                @click="handleClick(1, record)">编辑权限</a-button>
                            <a-button class="button" status="danger" size="small"
                                @click="handleClick(2, record)">删除</a-button>
                            <a-button class="button" status="warning" size="small"
                                @click="handleClick(3, record)">菜单权限</a-button>
                        </div>
                    </template>
                </a-table-column>
            </template>
        </a-table>
        <rolemodal v-model:visible="visible" v-model:editor="editor" v-model:backform="backform">
            <template #alert>
                <icon-exclamation-circle-fill size="18" style="color: rgb(var(--warning-6));margin-right: 10px;" />
            </template>
        </rolemodal>
    </div>
</template>

<script setup lang='ts'>
import { reactive, shallowRef, shallowReactive } from 'vue'
import rolemodal from '@/components/background/modal/rolemodal.vue'
let visible = shallowRef(false)
let editor = shallowRef()
let backform = shallowReactive({
    rolename: '',
    type: '',
    description: '',
})
const columns = reactive([
    {
        id: 0,
        title: '角色名称',
        dataIndex: 'rolename',
        width: 200,
    },
    {
        id: 1,
        title: '角色类型',
        dataIndex: 'type',
        width: 300,
    },
    {
        id: 2,
        title: '描述信息',
        dataIndex: 'description',
        width: 300,
    },
    {
        id: 3,
        title: '操作',
        dataIndex: 'operator',
        width: 300,
    }
])
let addrole = reactive({
    type: '',
    rolename: '',
    description: '',
})
const data = reactive([{
    type: 'student',
    rolename: '学生',
    description: "23000",
}, {
    type: 'teacher',
    rolename: '教师',
    description: "25000",
}, {
    type: 'admin',
    rolename: '管理员',
    description: "22000",
}]
)
const handleClick = (value: number, item?: any) => {
    visible.value = true
    editor.value = value
    console.log(item);

    if (value == 1) {
        backform.type = item.type
        backform.rolename = item.rolename
        backform.description = item.description
    } else if (value == 2) {

    } else if (value == 3) {

    }
}
</script>

<style lang='scss' scoped>
.role-manage {
    margin-top: 20px;

    .addrole {
        text-align: end
    }

}

.role-button {
    text-align: center;

    .button {
        margin-right: 10px;
        margin-bottom: 10px;

    }
}
</style>
