<template>
    <a-card>
        <div>
            <a-tabs default-active-key="1" lazy-load @change="tabChange">
                <a-tab-pane key="1" title="操作日志">
                    <DataTable :columns="operateColumns" :address="operateAddress" ref="operateTable">
                    </DataTable>
                </a-tab-pane>
                <a-tab-pane key="2" title="登录日志">
                    <DataTable :columns="loginColumns" :address="loginAddress" ref="loginTable">
                    </DataTable>
                </a-tab-pane>
                <template #extra>
                    <a-button type="outline" status="warning" @click="clearLogs">清空日志</a-button>
                </template>
            </a-tabs>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { reactive, h, ref, computed } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import { post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let currentkey = ref()
const operateTable = ref()
const loginTable = ref()
const operateAddress = '/log/oper/page'
const loginAddress = '/log/login/page'
const operateColumns = reactive([
    {
        title: '日志ID',
        dataIndex: 'oid',
    },
    {
        title: '操作人员',
        dataIndex: 'operName',
        width: 110,
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '请求地址',
        dataIndex: 'operUrl',
        width: 110,
        filterable: {
            filter: (value: string, record: any) => record.operUrl.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '操作地址',
        dataIndex: 'operIp',
    },
    {
        title: '归属地',
        dataIndex: 'operLocation',
        filterable: {
            filter: (value: string, record: any) => record.operLocation.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '请求方法',
        dataIndex: 'requestMethod',
        width: 110,
        filterable: {
            filter: (value: string, record: any) => record.requestMethod.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '请求参数',
        dataIndex: 'operParam',
    },
    {
        title: '返回参数',
        dataIndex: 'jsonResult',
        ellipsis: true,
        tooltip: { position: 'bottom' },
    },
    {
        title: '操作状态',
        dataIndex: 'success',
        render: (data: any) => {
            return data.record.success == true ? '成功' : '失败'
        },
        width: 110,
        filterable: {
            filters: [{
                text: '成功',
                value: true,
            },
            {
                text: '失败',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.success == value[0],
        }
    },
    {
        title: '错误消息',
        dataIndex: 'errorMsg',
        ellipsis: true,
        tooltip: { position: 'bottom' },
    },
    {
        title: '操作时间',
        dataIndex: 'operTime',
        width: 120,
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
    },
    {
        title: '消耗时间',
        dataIndex: 'costTime',
        width: 120,
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
    }
])
const loginColumns = reactive([
    {
        title: '编号',
        dataIndex: 'lid',
        width: 190,
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 120,
        filterable: {
            filter: (value: string, record: any) => record.userName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: 'ip',
        dataIndex: 'ipaddr',
        width: 140,
    },
    {
        title: '地点',
        dataIndex: 'location',
        width: 90,
        filterable: {
            filter: (value: string, record: any) => record.location.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '操作系统',
        dataIndex: 'os',
        width: 120,
        filterable: {
            filter: (value: string, record: any) => record.os.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '浏览器类型',
        dataIndex: 'browser',
        width: 130,
        filterable: {
            filter: (value: string, record: any) => record.browser.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '状态',
        dataIndex: 'success',
        width: 90,
        render: (data: any) => {
            return data.record.success == true ? '成功' : '失败'
        },
        filterable: {
            filters: [{
                text: '成功',
                value: true,
            },
            {
                text: '失败',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.success == value[0],
        }
    },
    {
        title: '描述',
        dataIndex: 'msg',
        width: 160,
        filterable: {
            filter: (value: string, record: any) => record.browser.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '时间',
        dataIndex: 'accessTime',
        width: 200,
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
    },
])
function tabChange(key: string | Number) {
    currentkey.value = key
}
function clearLogs() {
    if (currentkey.value == '1') {
        post(
            '/log/oper/clean',
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('清除成功')
                operateTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else if (currentkey.value == '2') {
        post(
            '/log/login/clean',
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('清除成功')
                loginTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
</script>

<style lang='scss' scoped></style>
