<template>
    <div class="stuinfo">
        <a-tabs lazy-load default-active-key="1">
            <a-tab-pane key="1" title="基本信息">
                <DataTable v-model:columns="BasicColumns" v-model:address="BasicAddress" :checkbox="true"
                    :editor="Editor">
                    <template #BasicForm>

                    </template>
                </DataTable>
            </a-tab-pane>
            <a-tab-pane key="2" title="学籍信息">
                <DataTable v-model:columns="StuStatusColumns" v-model:address="StudentAddress" :checkbox="true"
                    :editor="Editor">
                    <template #stuForm>
                        123456
                    </template>
                </DataTable>
            </a-tab-pane>
            <a-tab-pane key="3" title="教师信息">
                <DataTable v-model:columns="TeachColumns" v-model:address="TeachAddress" :checkbox="true"
                    :editor="Editor">
                    <template #form>
                        123456
                    </template>
                </DataTable>
            </a-tab-pane>
            <template #extra>
                <div class="StuinfoOption">
                    <a-button class="button" type="primary" size="small" status="success"
                        @click="addUser">添加用户</a-button>
                    <a-button class="button" type="primary" size="small" status="success" @click="addUser"
                        v-if="userInfo.authorities.includes('ROLE_ADMIN')">批量导入</a-button>
                    <a-button class="button" type="primary" size="small" status="success"
                        @click="addUser">删除用户</a-button>
                </div>
            </template>
        </a-tabs>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { reactive, h, computed } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import useUserStore from '@/stores/modules/user'
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
const BasicAddress: string = '/user/page'
const StudentAddress: string = '/console/user/schoolStatus/page'
const TeachAddress: string = '/console/user/basic/page'
const Editor: boolean = true

const BasicColumns = [
    {
        title: '学号',
        dataIndex: 'number',
        width: 120,
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
        width: 80,
        filterable: {
            filter: (value: string, record: any) => record.username.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
        filterable: {
            filter: (value: string, record: any) => record.email.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '手机',
        dataIndex: 'phone',
        width: 150,
        filterable: {
            filter: (value: string, record: any) => record.email.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        filterable: {
            filters: [{
                text: '男',
                value: '男',
            },
            {
                text: '女',
                value: '女',
            },
            ],
            filter: (value: string, record: any) => record.sex == value,
        }
    },
    {
        title: '身份证号',
        dataIndex: 'idNumber',
        width: 190,
        filterable: {
            filter: (value: string, record: any) => record.email.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '启用',
        dataIndex: 'enabled',
        width: 80,
        filterable: {
            filters: [{
                text: '启用',
                value: '1',
            },
            {
                text: '禁用',
                value: '0',
            },
            ],
            filter: (value: string, record: any) => record.sex == value,
        }
    },
    {
        title: '锁定',
        dataIndex: 'locked',
        width: 80,
        filterable: {
            filters: [{
                text: '锁定',
                value: '1',
            },
            {
                text: '解锁',
                value: '0',
            },
            ],
            filter: (value: string, record: any) => record.sex == value,
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
];
const StuStatusColumns = [
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
            filter: (value: string, record: any) => record.year.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '学院',
        dataIndex: 'dept',
        filterable: {
            filter: (value: string, record: any) => record.dept.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '班级',
        dataIndex: 'classes',
        filterable: {
            filter: (value: string, record: any) => record.classes.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '专业',
        dataIndex: 'major',
        filterable: {
            filter: (value: string, record: any) => record.major.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        },
        width: 200
    },
    {
        title: '学制',
        dataIndex: 'cycle',
        width: 90,
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
        width: 110,
        slotName: "action"
    }
]
const TeachColumns = [
    {
        title: '职工号',
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
        title: '院系',
        dataIndex: 'dept_id',
        filterable: {
            filter: (value: string, record: any) => record.dept_id.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '专业',
        dataIndex: 'major_id',
        filterable: {
            filter: (value: string, record: any) => record.major_id.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '班级',
        dataIndex: 'class_id',
        filterable: {
            filter: (value: string, record: any) => record.class_id.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
]
function addUser() {

}
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
