<template>
    <div class="stuinfo">
        <div class="StuinfoOption">
            <a-button class="button" type="primary" size="small" status="success">添加用户</a-button>
            <a-button class="button" type="primary" size="small" status="success">批量导入</a-button>
            <a-button class="button" type="primary" size="small" status="success">删除用户</a-button>
            <a-button class="button" type="primary" size="small" status="success">编辑用户</a-button>
        </div>
        <a-tabs lazy-load default-active-key="1">
            <a-tab-pane key="1" title="学生基本信息">
                <BasicTable v-model:columns="BasicColumns"></BasicTable>
            </a-tab-pane>
            <a-tab-pane key="2" title="学生学籍信息">
                <BasicTable v-model:columns="StuStatusColumns"></BasicTable>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>

<script setup lang='ts'>
import BasicTable from '@/components/background/stutable/BasicTable.vue'
import { reactive } from 'vue';
let BasicColumns = [
    {
        id: 0,
        title: '学号',
        dataIndex: 'number',
    },
    {
        id: 1,
        title: '姓名',
        dataIndex: 'name',
    },
    {
        id: 2,
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        id: 3,
        title: '手机',
        dataIndex: 'phone',
    },
    {
        id: 4,
        title: '性别',
        dataIndex: 'sex',
    },
    {
        id: 5,
        title: '身份证号',
        dataIndex: 'idCard',
    },
    {
        id: 6,
        title: '状态',
        dataIndex: 'state',
    },
    {
        id: 7,
        title: '头像',
        dataIndex: 'avatar',
    },
];
let StuStatusColumns = reactive([

])
</script>

<style lang='scss' scoped>
.stuinfo {
    max-height: 85vh;

    .StuinfoOption {
        display: flex;
        justify-content: end;
        margin: 10px 0 0 0;

        .button {
            margin-right: 10px;
        }
    }
}
</style>
