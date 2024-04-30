<template>
    <div class="stuinfo">
        <a-tabs lazy-load default-active-key="1">
            <a-tab-pane key="1" title="学生基本信息">
                <DataTable v-model:columns="BasicColumns" v-model:address="BasicAddress"></DataTable>
            </a-tab-pane>
            <a-tab-pane key="2" title="学生学籍信息">
                <DataTable v-model:columns="StuStatusColumns" v-model:address="address"></DataTable>
            </a-tab-pane>
            <template #extra>
                <div class="StuinfoOption">
                    <a-button class="button" type="primary" size="small" status="success">添加用户</a-button>
                    <a-button class="button" type="primary" size="small" status="success"
                        v-if="userInfo.role === 3">批量导入</a-button>
                    <a-button class="button" type="primary" size="small" status="success">删除用户</a-button>
                </div>
            </template>
        </a-tabs>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { reactive, h } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import useUserStore from '@/stores/modules/user'
let userStore = useUserStore()
let userInfo = userStore.getUserInfo()
let BasicColumns = [
    {
        title: '学号',
        dataIndex: 'number',
        width: 200
    },
    {
        title: '姓名',
        dataIndex: 'username',
        width: 120
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 200
    },
    {
        title: '手机',
        dataIndex: 'phone',
        width: 150
    },
    {
        title: '性别',
        dataIndex: 'sex',
        width: 70,
    },
    {
        title: '身份证号',
        dataIndex: 'idNumber',
        width: 190
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 70,
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        width: 80,
        slotName: "avatar"
    },
    {
        title: '操作',
        dataIndex: 'action',
        slotName: "action"
    }
];
let StuStatusColumns = reactive([
    {
        title: '学号',
        dataIndex: 'number',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filter: (value: string, record: any) => record.number.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '姓名',
        dataIndex: 'username',
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '入学年份',
        dataIndex: 'year',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        filterable: {
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'Paris',
                value: 'Paris',
            },],
            filter: (value: string, record: any) => record.address.includes(value),
        }
    },
    {
        title: '学院',
        dataIndex: 'dept'
    },
    {
        title: '班级',
        dataIndex: 'classes',
    },
    {
        title: '专业',
        dataIndex: 'major',
        width: 200
    },
    {
        title: '学制',
        dataIndex: 'cycle',
        width: 80,
        filterable: {
            filters: [{
                text: '2年',
                value: '2',
            },
            {
                text: '3年',
                value: '3',
            },
            {
                text: '4年',
                value: '4',
            },
            {
                text: '5年',
                value: '5',
            }
            ],
            filter: (value: string, record: any) => record.cycle == value,
            multiple: true
        }
    },
    {
        title: '学籍状态',
        dataIndex: 'stuStatus',
        filterable: {
            filters: [{
                text: '在读',
                value: '在读',
            },
            {
                text: '毕业',
                value: '毕业',
            },
            {
                text: '休学',
                value: '休学',
            }
            ],
            filter: (value: string, record: any) => record.stuStatus.includes(value),
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        slotName: "action"
    }
])
const address: string = '/console/user/schoolStatus/page'
const BasicAddress: string = '/console/user/basic/page'
</script>

<style lang='scss' scoped>
.stuinfo {
    margin-top: 5px;
    max-height: 85vh;

    .StuinfoOption {
        display: flex;
        justify-content: end;

        .button {
            margin-right: 10px;
        }
    }
}
</style>
