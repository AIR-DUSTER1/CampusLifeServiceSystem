<template>
    <a-card>
        <div>
            <div class="Merchants-button">
                <a-button class="btn" type="primary" status="success" @click="add()">新增商家</a-button>
                <a-button class="btn" type="primary" status="success" @click="deleteMerchants()">删除商家</a-button>
            </div>
            <DataTable ref="merchantTable" :columns="BusinessColumns" :address="BusinessAddress" :id="'mid'"
                :checkbox="true" v-model:selectKey="selectKey" v-model:visible="visible" v-model:modify="form.modify"
                :editor="true" v-model:modifyData="modifyData">
            </DataTable>
            <a-modal v-model:visible="visible" :title="formTitle" width="50%">
                <div class="modal-content">
                    <a-form v-if="form" :model="form" :rules="rules">
                        <div class="form-content">
                            <a-form-item label="商家名" field="name" label-col-flex="60px">
                                <a-input v-model="form.name" placeholder="请输入商家名" />
                            </a-form-item>
                            <a-form-item label="联系人" field="contact" label-col-flex="60px">
                                <a-input v-model="form.contact" placeholder="请输入联系人" />
                            </a-form-item>
                            <a-form-item label="卡余额" field="balance" label-col-flex="60px">
                                <a-input-number v-model="form.balance" placeholder="请输入卡余额" :disabled="!form.modify"
                                    hide-button />
                            </a-form-item>
                            <a-form-item label="地址" field="address" label-col-flex="60px">
                                <a-input v-model="form.address" placeholder="请输入地址" />
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
                <template #footer>
                    <div class="modal-footer">
                        <a-button style="margin-right: .625rem;" @click="visible = false">取消</a-button>
                        <a-button v-if="!form.modify" type="primary" @click="handleBeforeOk()">添加</a-button>
                        <a-button v-else type="primary" @click="modify()">修改</a-button>
                    </div>
                </template>
            </a-modal>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { del, post, put } from '@/api/api';
import DataTable from '@/components/background/table/DataTable.vue'
import { Message } from '@arco-design/web-vue';
import { ref, h, reactive, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
let selectKey = ref()
let visible = ref(false)
let modifyData = ref()
let formTitle = ref('添加商家')
const form = ref({
    name: '',
    contact: '',
    balance: 0,
    address: '',
    modify: false
})
const merchantTable = ref()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const BusinessAddress = ref('/shop/merchant/page')
const BusinessColumns = [
    {
        title: '商户ID',
        dataIndex: 'mid',
    },
    {
        title: '商户名称',
        dataIndex: 'name',
    },
    {
        title: '商户地址',
        dataIndex: 'address',
    },
    {
        title: '商户电话',
        dataIndex: 'contact',
    },
    {
        title: '余额',
        dataIndex: 'balance'
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
        dataIndex: 'action',
        slotName: 'action'
    }
]
const rules = {
    name: [
        {
            required: true,
            message: '商家名不能为空',
        },
    ],
    contact: [
        {
            required: true,
            message: '联系方式不能为空',

        },
        {
            validator: (value: any, cb: any) => {
                const phoneRegex = /^1[3-9]\d{9}$/;
                if (!phoneRegex.test(value)) {
                    cb('请输入有效的手机号');
                } else {
                    cb();
                }
            }
        }
    ],
    balance: [
        {
            required: true,
            message: '余额不能为空',
        },
    ],
    address: [
        {
            required: true,
            message: '地址不能为空',
        }
    ],
}
watch(modifyData, (value) => {
    if (form.value.modify) {
        formTitle.value = '修改商家'
        form.value.name = value.name
        form.value.contact = value.contact
        form.value.balance = value.balance
        form.value.address = value.address
    }
})
function add() {
    formTitle.value = '添加商家'
    form.value.name = ''
    form.value.contact = ''
    form.value.balance = 0
    form.value.address = ''
    form.value.modify = false
    visible.value = !visible.value
    form.value.modify = false
    modifyData.value = {}
}
function deleteMerchants() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.success('请选择要删除的商家')
    } else {
        del(
            `/shop/merchant/${selectKey.value}`,
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
function modify() {
    if (form.value.name == '' || form.value.name == null || form.value.name == undefined) {
        Message.error('请输入商家名')
    } else if (form.value.contact == '' || form.value.contact == null || form.value.contact == undefined) {
        Message.error('请输入联系人')
    } else if (form.value.address == '' || form.value.address == null || form.value.address == undefined) {
        Message.error('请输入地址')
    } else {
        put(
            '/shop/merchant',
            {
                name: form.value.name,
                contact: form.value.contact,
                balance: form.value.balance,
                address: form.value.address
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                merchantTable.value.getlist()
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function handleBeforeOk() {
    if (form.value.name == '' || form.value.name == null || form.value.name == undefined) {
        Message.error('请输入商家名')
    } else if (form.value.contact == '' || form.value.contact == null || form.value.contact == undefined) {
        Message.error('请输入联系人')
    } else if (form.value.address == '' || form.value.address == null || form.value.address == undefined) {
        Message.error('请输入地址')
    } else {
        post(
            `/shop/merchant`,
            {
                name: form.value.name,
                contact: form.value.contact,
                balance: form.value.balance,
                address: form.value.address
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('添加成功')
                merchantTable.value.getlist()
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
</script>

<style scoped lang="scss">
.Merchants-button {
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