<template>
    <div class="role-manage">
        <div class="addrole">
            <a-button type="primary" size="small" status="success"
                @click="handleClick(roleOption.editRole, addrole)">添加角色</a-button>
        </div>
        <a-table :scroll="{ maxHeight: '73vh' }" :data="rolelist" :loading="loading" style="margin-top: 30px"
            :bordered="{ cell: true }" column-resizable :pagination="false">
            <template #columns>
                <a-table-column v-for="{ title, id, dataIndex } in columns" :key="id">
                    <template #title>
                        {{ title }}
                    </template>
                    <template #cell="{ record, rowindex }">
                        <template v-if="dataIndex == 'updateTime'">
                            {{ record[dataIndex] ? record[dataIndex].substring(0, 10) :
                    record['createTime'].substring(0, 10) }}
                        </template>
                        <template v-else>
                            {{ record[dataIndex] }}
                        </template>
                        <div class="role-button" v-if="dataIndex == 'operator'">
                            <a-button class="button" status="success" size="small"
                                @click="handleClick(roleOption.editRole, record)">编辑</a-button>
                            <a-button class="button" status="danger" size="small"
                                @click="handleClick(roleOption.deleteRole, record)">删除</a-button>
                            <a-button class="button" status="warning" size="small"
                                @click="handleClick(roleOption.roleMenu, record)">菜单权限</a-button>
                        </div>
                    </template>
                </a-table-column>
            </template>
        </a-table>
        <a-pagination :total="table.total" :current="table.pageNumber"
            @change="(pageNumber: number) => table.pageNumber = pageNumber"
            @page-size-change="(pageSize: number) => table.pageSize = pageSize" hide-on-single-page show-total
            show-jumper show-page-size></a-pagination>
        <rolemodal v-model:visible="visible" @regetrolelist="getrolelist" v-model:editor="editor"
            v-model:backform="backform">
            <template #alert>
                <icon-exclamation-circle-fill size="18" style="color: rgb(var(--warning-6));margin-right: 10px;" />
            </template>
        </rolemodal>
    </div>
</template>

<script setup lang='ts'>
import { reactive, shallowRef, shallowReactive, onMounted, computed, onUpdated } from 'vue'
import rolemodal from '@/components/background/modal/rolemodal.vue'
import { get, post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
let visible = shallowRef(false)
let editor = shallowRef()
let loading = shallowRef(true)
let userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const roleOption = {
    editRole: 1,
    deleteRole: 2,
    roleMenu: 3
}
let table = reactive({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
})
let backform = shallowReactive({
    id: '',
    name: '',
    code: '',
    updateTime: '',
    addrole: false
})
const columns = reactive([
    {
        id: 0,
        title: '角色名称',
        dataIndex: 'name',
    },
    {
        id: 1,
        title: '角色类型',
        dataIndex: 'code',
    },
    {
        id: 3,
        title: '更新时间',
        dataIndex: 'updateTime',
    },
    {
        id: 4,
        title: '操作',
        dataIndex: 'operator',
        width: 300,
    }
])
let addrole = reactive({
    code: '',
    name: '',
    updateTime: '',
    addrole: true
})

let rolelist = reactive([])

onMounted(() => {
    getrolelist()
})
function getrolelist() {
    loading.value = true
    get(
        '/user/role/page',
        { 'Authorization': 'Bearer ' + userInfo.value.access_token },
        { page: table.pageNumber, pageSize: table.pageSize }
    ).then((res: any) => {
        if (res.success) {
            rolelist = res.data.records
            loading.value = false
        } else {
            loading.value = false
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err.message)
    })
}
const handleClick = (value: number, item?: any) => {
    visible.value = true
    editor.value = value
    // console.log(item);
    if (value == roleOption.editRole) {
        backform.id = item.rid
        backform.code = item.code
        backform.name = item.name
        backform.updateTime = item.updateTime ? item.updateTime : item.createTime
        backform.addrole = item.addrole
    } else if (value == roleOption.deleteRole) {
        backform.id = item.rid
    } else if (value == roleOption.roleMenu) {
        backform.id = item.rid
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
