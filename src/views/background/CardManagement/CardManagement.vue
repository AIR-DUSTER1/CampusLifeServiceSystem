<template>
    <div>
        <DataTable v-model:columns="AccountColumns" v-model:address="AccountAddress">
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
        width: 110,
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '用户信息',
        dataIndex: 'username',
        width: 110,
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
        width: 110,
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
</script>

<style lang='scss' scoped></style>
