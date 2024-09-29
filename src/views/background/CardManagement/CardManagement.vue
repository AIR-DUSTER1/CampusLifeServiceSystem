<template>
    <a-card>
        <div>
            <div class="card-button">
                <a-button class="btn" type="primary" status="success" @click="addCard">新增账户</a-button>
                <a-button class="btn" type="primary" status="success" @click="disableCard(selectKey)">禁用账户</a-button>
            </div>
            <DataTable ref="cardTable" :columns="AccountColumns" :id="'cardNo'" :address="AccountAddress"
                :checkbox="true" :editor="true" v-model:visible="visible" v-model:selectKey="selectKey"
                v-model:modifyData="modifyData" v-model:modify="form.modify">
            </DataTable>
            <a-modal v-model:visible="visible" :title="formTitle" width="50%">
                <div class="modal-content">
                    <a-form v-if="form" :model="form">
                        <div class="form-content">
                            <a-form-item label="用户名" prop="username" label-col-flex="60px">
                                <a-input v-model="form.username" />
                            </a-form-item>
                            <a-form-item label="卡密码" prop="password" label-col-flex="60px">
                                <a-input v-model="form.password" />
                            </a-form-item>
                            <a-form-item v-if="form.modify" label="启用" prop="enabled" label-col-flex="60px">
                                <a-switch v-model="form.enabled" :loading="loading" checked-color="#23C343"
                                    unchecked-color="#F53F3F" type="round" @change="enableChange">
                                    <template #checked>
                                        启用
                                    </template>
                                    <template #unchecked>
                                        禁用
                                    </template>
                                </a-switch>
                            </a-form-item>
                            <a-form-item v-if="form.modify" label="锁定" prop="locked" label-col-flex="60px">
                                <a-switch v-model="form.locked" :loading="loading" checked-color="#F53F3F"
                                    unchecked-color="#23C343" type="round" @change="lockChange">
                                    <template #checked>
                                        锁定
                                    </template>
                                    <template #unchecked>
                                        解锁
                                    </template>
                                </a-switch>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
                <template #footer>
                    <div class="modal-footer">
                        <a-button style="margin-right: .625rem;" @click="visible = false">取消</a-button>
                        <a-button v-if="!form.modify" type="primary" @click="add()">添加</a-button>
                        <a-button v-else type="primary" @click="modify()">修改</a-button>
                    </div>
                </template>
            </a-modal>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, h, reactive, computed, watch } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import { post, put } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let formTitle = ref('添加卡片')
let selectKey = ref()
let loading = ref(false)
const form = ref({
    cardNo: '',
    username: '',
    password: '',
    enabled: false,
    locked: false,
    modify: false
})
let visible = ref(false)
const cardTable = ref()
let modifyData = ref()
const AccountAddress = '/card/page'
const AccountColumns = reactive([
    {
        title: '卡号',
        dataIndex: 'cardNo',
    },
    {
        title: '卡余额',
        dataIndex: 'balance',
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '用户名',
        dataIndex: 'payload',
        filterable: {
            filter: (value: string, record: any) => record.operUrl.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '启用',
        dataIndex: 'enabled',
        filterable: {
            filters: [{
                text: '启用',
                value: true,
            },
            {
                text: '禁用',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.enabled == value[0],
        },
        render: (value: any) => {
            return value.record.enabled ? '启用' : '禁用'
        }
    },
    {
        title: '锁定',
        dataIndex: 'locked',
        filterable: {
            filters: [{
                text: '锁定',
                value: true,
            },
            {
                text: '解锁',
                value: false,
            },
            ],
            filter: (value: string, record: any) => record.locked == value[0],
        },
        render: (value: any) => {
            return value.record.locked ? '锁定' : '解锁'
        }
    },
    {
        title: '过期时间',
        dataIndex: 'expired',
    },
    {
        title: '操作人',
        dataIndex: 'updateBy',
        slotName: 'updateBy'
    },
    {
        title: '操作时间',
        dataIndex: 'updateTime',
        slotName: 'updateTime'
    },
    {
        title: '操作',
        slotName: 'action'
    }
])
watch(modifyData, (value) => {
    console.log(value)
    if (form.value.modify) {
        formTitle.value = '修改卡片'
        form.value.cardNo = value.cardNo
        form.value.username = value.payload
        form.value.password = value.password
        form.value.enabled = value.enabled
        form.value.locked = value.locked
    }
})
function add() {
    if (form.value.username == '' || form.value.username == undefined) {
        Message.error('请输入用户名')
    } else if (form.value.password == '' || form.value.password == undefined) {
        Message.error('请输入密码')
    } else if (form.value.username != '' && form.value.password != '') {
        post(
            '/card/',
            {
                password: form.value.password,
                username: form.value.username
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                visible.value = !visible.value
                cardTable.value.getlist()
                Message.success('添加成功')
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function addCard() {
    formTitle.value = '添加卡片'
    form.value.cardNo = ''
    form.value.username = ''
    form.value.password = ''
    form.value.enabled = false
    form.value.locked = false
    form.value.modify = false
    modifyData.value = {}
    visible.value = !visible.value
}
function modify() {
    console.log(modifyData)
    if (form.value.username == '' || form.value.username == undefined) {
        Message.error('请输入用户名')
    } else if (form.value.password == '' || form.value.password == undefined) {
        Message.error('请输入密码')
    } else if (form.value.username != '' && form.value.password != '') {
        put(
            `/card/${form.value.cardNo}`,
            {
                username: form.value.username,
                password: form.value.password
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                cardTable.value.getlist()
                Message.success('修改成功')
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function disableCard(cardNo: string) {
    post(
        `/card/${cardNo}/disable`,
        {},
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
        if (res.success) {
            cardTable.value.getlist()
            Message.success('禁用成功')
            loading.value = false
        } else {
            Message.error(res.message)
            form.value.enabled = true
            loading.value = false
        }
    }).catch((err) => {
        Message.error(err)
        form.value.enabled = true
        loading.value = false
    })
}
function enableChange(value: boolean) {
    loading.value = true
    if (value) {
        console.log(value);
        post(
            `/card/${form.value.cardNo}/enable`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                cardTable.value.getlist()
                Message.success('启用成功')
                loading.value = false
            } else {
                Message.error(res.message)
                form.value.enabled = false
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            form.value.enabled = false
            loading.value = false
        })
    } else {
        disableCard(form.value.cardNo)
    }
}
function lockChange(value: boolean) {
    loading.value = true
    if (value) {
        post(
            `/card/${form.value.cardNo}/lock`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                cardTable.value.getlist()
                Message.success('锁定成功')
                loading.value = false
            } else {
                Message.error(res.message)
                form.value.locked = false
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            form.value.locked = false
            loading.value = false
        })
    } else {
        post(
            `/card/${form.value.cardNo}/unlock`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('解锁成功')
                cardTable.value.getlist()
                loading.value = false
            } else {
                Message.error(res.message)
                form.value.locked = true
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            form.value.locked = true
            loading.value = false
        })
    }
}
</script>

<style lang='scss' scoped>
.card-button {
    text-align: end;
    margin: 0.625rem;

    .btn {
        margin-left: 0.625rem;
    }
}

.form-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
</style>
