<template>
    <div>
        <a-typography-title :heading="3" style="margin: 0">
            用户日志
        </a-typography-title>
        <div class="table">
            <Datatable v-model:columns="columns" v-model:address="address" :checkbox="false"/>
        </div>
 </div>
</template>

<script setup lang='ts'>
import Datatable from '@/components/background/table/DataTable.vue'
import { ref, reactive, onMounted } from 'vue'
let address = ref('')
let columns= reactive([
    {
        title: '详情',
        dataIndex: 'details',
},
{
        title: 'ip地址',
        dataIndex: 'IpAddress',
},
{
        title: '地点',
        dataIndex: 'address',
},
{
        title: '操作系统',
        dataIndex: 'operation',
},
{
        title: '浏览器类型',
        dataIndex: 'browser',
},
{
        title: '时间',
        dataIndex: 'time',
},
])
</script>

<style lang='scss' scoped>
.table{
    margin-top: 1.875rem;
}
</style>
