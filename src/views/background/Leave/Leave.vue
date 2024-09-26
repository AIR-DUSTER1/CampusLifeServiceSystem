<template>
    <div>
        <DataTable :columns="leaveColumns" :id="'id'" :address="LeaveApi" :checkbox="true" ref="loginTable">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import DataTable from '@/components/background/table/DataTable.vue'

const LeaveApi = ref('/life/leave/page')
const leaveColumns = ref([
    {
        title: '姓名',
        key: 'name',
        width: '120px',
    },
    {
        title: '电话',
        key: 'phone',
        width: '120px',
    },
    {
        title: '地址',
        key: 'address',
        width: '120px',
    },
    {
        title: '原因',
        key:'reason',
    }
])
</script>

<style lang='scss' scoped></style>
