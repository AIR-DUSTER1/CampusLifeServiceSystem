<template>
    <div>
        <DataTable :columns="repairsColumns" :id="'id'" :address="repairsAddress" :checkbox="true" ref="loginTable">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import DataTable from '@/components/background/table/DataTable.vue'
const  repairsAddress = ref('/life/repairs/page')
const repairsColumns = [
    {
        title: '报修单号',
        dataIndex: 'id'
    },
    {
        title: '报修人',
        dataIndex: 'username'
    },
    {
        title: '手机号',
        dataIndex: 'phone'
    },
    {
        title: '报修类型',
        dataIndex: 'type'
    },
    {
        title: '报修区域',
        dataIndex: 'region'
    },
    {
        title: '故障描述',
        dataIndex: 'remark'
    },
    {
        title: '报修单号',
        dataIndex: 'username'
    },
    {
        title: '更新时间',
        dataIndex: 'updateBy'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime'
    }
]
</script>

<style lang='scss' scoped></style>
