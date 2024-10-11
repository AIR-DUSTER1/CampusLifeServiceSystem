<template>
    <a-card>
        <div>
            <div class="device-button">
                <a-button class="btn" type="primary" status="success" @click="add()">新增设备</a-button>
                <a-button class="btn" type="primary" status="success" @click="deleteDevice()">删除设备</a-button>
            </div>
            <DataTable :columns="DeviceColumns" :address="DeviceAddress" :id="'did'" :checkbox="true"
                v-model:selectKey="selectKey" ref="deviceTable" v-model:visible="visible" v-model:modify="form.modify"
                :editor="true" v-model:modifyData="modifyData">
            </DataTable>
            <a-modal v-model:visible="visible" :title="formTitle" :width="'50%'">
                <a-form v-if="form" :model="form" :rules="rules" ref="formRef">
                    <div class="form-content">
                        <a-form-item label="设备名称" field="name" label-col-flex="70px">
                            <a-input v-model="form.name" placeholder="请输入设备名称" />
                        </a-form-item>
                        <a-form-item label="设备账户" field="account" label-col-flex="70px">
                            <a-input v-model="form.account" placeholder="请输入设备账户" />
                        </a-form-item>
                        <a-form-item label="所属商户" field="mid" label-col-flex="70px">
                            <a-input-number v-model="form.mid" placeholder="请输入所属商户" hide-button />
                        </a-form-item>
                        <a-form-item label="设备密码" field="password" label-col-flex="70px">
                            <a-input v-model="form.password" placeholder="请输入设备密码" />
                        </a-form-item>
                        <a-form-item label="设备类型" field="type" label-col-flex="70px">
                            <a-select v-model="form.type" placeholder="请选择设备类型" @change="changeType">
                                <a-option v-for="item in TypeOption" :key="item.value" :label="item.label"
                                    :value="item.value"></a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="设备状态" field="status" label-col-flex="70px">
                            <a-select v-model="form.status" placeholder="请选择设备状态" @change="changeStatus">
                                <a-option>在线</a-option>
                                <a-option>离线</a-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </a-form>
                <template #footer>
                    <div class="modal-footer">
                        <a-button style="margin-right: .625rem;" @click="visible = false">取消</a-button>
                        <a-button v-if="!form.modify" :loading="loading" type="primary"
                            @click="handleBeforeOk()">添加</a-button>
                        <a-button v-else type="primary" :loading="loading" @click="modify()">修改</a-button>
                    </div>
                </template>
            </a-modal>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, h, reactive, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import { del, post, put } from '@/api/api';
import { Message } from '@arco-design/web-vue'
let loading = ref(false)
let selectKey = ref()
let visible = ref(false)
let modifyData = ref()
let formTitle = ref('添加设备')
let typeCaluate = computed(() => {
    if (form.value.type == '卡机') {
        return 1
    } else if (form.value.type == '洗衣机') {
        return 2
    } else if (form.value.type == '烘干机') {
        return 3
    } else if (form.value.type == '吹风机') {
        return 4
    }
})
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const deviceTable = ref()
const DeviceAddress = '/shop/device/page'
const form = ref({
    did: 0,
    account: "",
    mid: null,
    name: "",
    password: "",
    status: '',
    type: '',
    modify: false
})
const DeviceColumns = [
    {
        title: '设备id',
        dataIndex: 'did',
    },
    {
        title: '设备名称',
        dataIndex: 'name',
    },
    {
        title: '所属商户',
        dataIndex: 'mid',
    },
    {
        title: '设备账户',
        dataIndex: 'account',
    },
    {
        title: '设备类型',
        dataIndex: 'type',
        render: (value: any) => {
            if (value.record.type == 1) {
                return '卡机'
            } else if (value.record.type == 2) {
                return '洗衣机'
            } else if (value.record.type == 3) {
                return '烘干机'
            } else if (value.record.type == 4) {
                return '吹风机'
            }
        }
    },
    {
        title: '设备状态',
        dataIndex: 'status',
        render: (value: any) => {
            return value.record.status == 1 ? '在线' : '离线'
        }
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
]
const TypeOption = [
    {
        label: '卡机',
        value: '卡机'
    },
    {
        label: '洗衣机',
        value: '洗衣机'
    },
    {
        label: '烘干机',
        value: '烘干机'
    },
    {
        label: '吹风机',
        value: '吹风机'
    },
]
const rules = {
    name: [
        {
            required: true,
            message: '商品名不能为空',
        },
    ],
    mid: [
        {
            required: true,
            message: '商户id不能为空',

        },
    ],
    account: [
        {
            required: true,
            message: '设备账户不能为空',
        },
    ],
    password: [
        {
            required: true,
            message: '设备密码不能为空',
        }
    ],
    type: [
        {
            required: true,
            message: '设备类型不能为空',
        }
    ],
    status: [
        {
            required: true,
            message: '设备状态不能为空',
        }
    ]
}
watch(modifyData, (value) => {
    if (form.value.modify) {
        formTitle.value = '修改设备'
        form.value.did = value.did
        form.value.name = value.name
        form.value.mid = value.mid
        form.value.account = value.account
        form.value.password = value.password
        form.value.status = value.status == 1 ? '在线' : '离线'
        if (value.type == 1) {
            form.value.type = '卡机'
        } else if (value.type == 2) {
            form.value.type = '洗衣机'
        } else if (value.type == 3) {
            form.value.type = '烘干机'
        } else if (value.type == 4) {
            form.value.type = '吹风机'
        }
    }
})
function add() {
    formTitle.value = '添加设备'
    console.log(formTitle.value)
    form.value.did = 0
    form.value.name = ''
    form.value.account = ''
    form.value.mid = null
    form.value.password = ''
    form.value.status = ''
    form.value.type = ''
    form.value.modify = false
    modifyData.value = {}
    visible.value = !visible.value
}
function deleteDevice() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.error('请选择要删除的设备')
    } else {
        del(
            `/shop/device/${form.value.did}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function handleBeforeOk() {
    loading.value = true
    if (form.value.name == '' || form.value.name == null || form.value.name == undefined) {
        Message.error('请输入设备名称')
        loading.value = false
    } else if (form.value.mid == '' || form.value.mid == null || form.value.mid == undefined) {
        Message.error('请输入商户id')
        loading.value = false
    } else if (form.value.account == '' || form.value.account == null || form.value.account == undefined) {
        Message.error('请输入设备账户')
        loading.value = false
    } else if (form.value.password == '' || form.value.password == null || form.value.password == undefined) {
        Message.error('请输入设备密码')
        loading.value = false
    } else if (form.value.type == '' || form.value.type == null || form.value.type == undefined) {
        Message.error('请选择设备类型')
        loading.value = false
    } else if (form.value.status == '' || form.value.status == null || form.value.status == undefined) {
        Message.error('请选择设备状态')
        loading.value = false
    } else {
        post(
            '/shop/device',
            {
                name: form.value.name,
                mid: form.value.mid,
                account: form.value.account,
                password: form.value.password,
                type: typeCaluate.value,
                status: form.value.status == '在线' ? 1 : 2
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('添加成功')
                deviceTable.value.getlist()
                loading.value = false
                visible.value = false
            } else {
                Message.error(res.message)
                loading.value = false
            }
        }).catch((err) => {
            Message.error(err)
            loading.value = false
        })
    }
}
function modify() {
    put(
        `/shop/device/${form.value.did}`,
        {
            name: form.value.name,
            mid: form.value.mid,
            account: form.value.account,
            // password: form.value.password,
            type: typeCaluate.value,
            status: form.value.status == '在线' ? 1 : 2
        },
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
        if (res.success) {
            Message.success('修改成功')
            deviceTable.value.getlist()
            loading.value = false
            visible.value = false
        } else {
            Message.error(res.message)
            loading.value = false
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function changeType(value: any) {
    form.value.type = value
}
function changeStatus(value: any) {
    form.value.status = value
}
</script>

<style lang='scss' scoped>
.device-button {
    text-align: end;
    margin: 0.625rem;

    .btn {
        margin-left: 0.625rem;
    }
}

.form-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
