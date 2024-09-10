<template>
    <div>
        <div class="news-button">
            <a-button class="btn" type="primary" status="success" @click="addCard">新增账户</a-button>
            <a-button class="btn" type="primary" status="success" @click="batchAdd">批量添加</a-button>
            <a-button class="btn" type="primary" status="success" @click="disableCard">禁用账户</a-button>
        </div>
        <DataTable :columns="AccountColumns" :address="AccountAddress" :checkbox="true">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, h, reactive } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
const AccountAddress = ''
const AccountColumns = reactive([
    {
        title: '卡号',
        dataIndex: 'cardNo',
    },
    {
        title: '卡余额',
        dataIndex: 'balance',
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '用户信息',
        dataIndex: 'username',
        filterable: {
            filter: (value: string, record: any) => record.operUrl.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付密码',
        dataIndex: 'password',
    },
    {
        title: '启用',
        dataIndex: 'enabled',
        filterable: {
            filter: (value: string, record: any) => record.operLocation.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '锁定',
        dataIndex: 'locked',
        filterable: {
            filter: (value: string, record: any) => record.requestMethod.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '过期时间',
        dataIndex: 'expired',
    },

])
function addCard() {

}
function batchAdd() {

}
function disableCard() {

}
</script>

<style lang='scss' scoped></style>
