<template>
        <div>
                <a-typography-title :heading="3" style="margin: 0">
                        登录日志
                </a-typography-title>
                <div class="table">
                        <Datatable v-model:columns="columns" v-model:address="address" :checkbox="false" />
                </div>
        </div>
</template>

<script setup lang='ts'>
import Datatable from '@/components/background/table/DataTable.vue'
import { ref, reactive, onMounted } from 'vue'
let address = ref('/log/login/list')
let columns = reactive([
        {
                title: '编号',
                dataIndex: 'lid',
        },
        {
                title: 'ip',
                dataIndex: 'ipaddr',
        },
        {
                title: '地点',
                dataIndex: 'location',
        },
        {
                title: '操作系统',
                dataIndex: 'os',
        },
        {
                title: '浏览器类型',
                dataIndex: 'browser',
        },
        {
                title: '时间',
                dataIndex: 'accessTime',
        },
])
</script>

<style lang='scss' scoped>
.table {
        margin-top: 1.875rem;
}
</style>
