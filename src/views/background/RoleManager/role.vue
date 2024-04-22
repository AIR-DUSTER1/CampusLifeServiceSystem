<template>
    <div class="role-manage">
        <div class="addrole">
            <a-button type="primary" size="small" status="success" @click="handleClick(1, addrole)">添加角色</a-button>
        </div>
        <a-table v-if="flag" :scroll="{ maxHeight: '73vh' }" :data="data" :loading="loading" style="margin-top: 30px"
            :bordered="{ cell: true }" table-layout-fixed column-resizable :pagination="false">
            <template #columns>
                <a-table-column title="角色名称" data-index="rolename" v-for="{ title, id, dataIndex } in columns"
                    :key="dataIndex">
                    <template #title>
                        {{ title }}
                    </template>
                    <template #cell="{ record, rowindex }">
                        {{ record[dataIndex] }}
                        <div class="role-button" v-if="dataIndex == 'operator'">
                            <a-button class="button" status="success" size="small"
                                @click="handleClick(1, record)">编辑</a-button>
                            <a-button class="button" status="danger" size="small"
                                @click="handleClick(2, record)">删除</a-button>
                            <a-button class="button" status="warning" size="small"
                                @click="handleClick(3, record)">菜单权限</a-button>
                        </div>
                    </template>
                </a-table-column>
            </template>
        </a-table>
        <rolemodal v-model:visible="visible" @regetrolelist="getrolelist" v-model:editor="editor"
            v-model:backform="backform">
            <template #alert>
                <icon-exclamation-circle-fill size="18" style="color: rgb(var(--warning-6));margin-right: 10px;" />
            </template>
        </rolemodal>
    </div>
</template>

<script setup lang='ts'>
import { reactive, shallowRef, shallowReactive, onMounted, watch, onUpdated } from 'vue'
import rolemodal from '@/components/background/modal/rolemodal.vue'
import { get, post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
let visible = shallowRef(false)
let flag = shallowRef(false)
let editor = shallowRef()
let loading = shallowRef(true)
let userStore = useUserStore()
let userInfo = userStore.getUserInfo()
let backform = shallowReactive({
    id: '',
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
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 300,
    },
    {
        id: 4,
        title: '操作',
        dataIndex: 'operator',
        width: 300,
    }
])
let addrole = reactive({
    type: '',
    rolename: '',
    updateTime: '',
    description: '',
})

let data = reactive(
    [
    ]
)

onMounted(() => {
    getrolelist()
})
function getrolelist() {
    loading.value = true
    get(
        '/console/role/list',
        { "token": userInfo.token }
    ).then((res: any) => {
        data = res.data
        flag.value = true
        loading.value = false
        console.log(data);
    })
}
const handleClick = (value: number, item?: any) => {
    visible.value = true
    editor.value = value
    console.log(item);
    if (value == 1) {
        backform.type = item.type
        backform.rolename = item.rolename
        backform.description = item.description
    } else if (value == 2) {
        backform.id = item.id
    } else if (value == 3) {
        backform.id = item.id
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
