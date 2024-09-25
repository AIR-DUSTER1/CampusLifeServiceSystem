<template>
    <div>
        <DataTable :columns="repairsColumns" :address="repairsAddress" ref="loginTable">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import DataTable from '@/components/background/table/DataTable.vue'
const  repairsAddress = ref('')
const repairsColumns = [
    {
        title: '报修单号',
        dataIndex: 'repairId'
    }
]
</script>

<style lang='scss' scoped></style>
