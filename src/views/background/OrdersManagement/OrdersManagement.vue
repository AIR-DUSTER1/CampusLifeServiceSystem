<template>
    <div>
        <DataTable :columns="OrdersColumns" :address="OrdersAddress" :checkbox="true">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, h, reactive } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
const OrdersAddress = ''
const OrdersColumns = reactive([
    {
        title: '订单号',
        dataIndex: 'orderNo',
    },
    {
        title: '卡号',
        dataIndex: 'cardNo',
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付时间',
        dataIndex: 'payTime',
        filterable: {
            filter: (value: string, record: any) => record.operUrl.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付方式',
        dataIndex: 'payType',
    },
    {
        title: '支付状态',
        dataIndex: 'payStatus',
        filterable: {
            filter: (value: string, record: any) => record.operLocation.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付流水号',
        dataIndex: 'traceNo',
        filterable: {
            filter: (value: string, record: any) => record.requestMethod.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '取消原因',
        dataIndex: 'cancelReason',
    },
    {
        title: '取消时间',
        dataIndex: 'cancelTime',
    }
])
</script>

<style lang='scss' scoped></style>
