<template>
    <div class="stuinfo">
        <div class="StuinfoOption"></div>
        <a-table :data="data" table-layout-fixed :scroll="{ maxHeight: '85vh' }" :columns="columns"
            :hoverable="form.hover" :loading="form.loading" :row-selection="rowSelection">

            <!-- <a-table-column title="avatar">
                <template #cell="{ record }">
                    <a-button>view</a-button>
                </template>
</a-table-column> -->
        </a-table>
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
const form = reactive({
    borderCell: false,
    hover: true,
    loading: false,
})
const rowSelection = reactive<any>({
    type: 'checkbox',
    showCheckedAll: true
});
const columns = [

    {
        title: '学号',
        dataIndex: 'number',
    },
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        title: '手机',
        dataIndex: 'phone',
    },
    {
        title: '性别',
        dataIndex: 'sex',
    },
    {
        title: '身份证号',
        dataIndex: 'idCard',
    },
    {
        title: '状态',
        dataIndex: 'state',
    },
    {
        title: '权限',
        dataIndex: 'authority',
    },
    {
        title: '头像',
        dataIndex: 'avatar',
    },
];

const data = [{
    id: '1',
    number: "",
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
},
{
    id: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
},
{
    id: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
},
{
    id: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
},
{
    id: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}];

</script>

<style lang='scss' scoped>
.stuinfo {
    max-height: 85vh;

    .StuinfoOption {
        display: flex;
        justify-content: end;
    }
}
</style>
