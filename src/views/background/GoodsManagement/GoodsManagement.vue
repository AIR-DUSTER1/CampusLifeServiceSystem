<template>
    <a-card>
        <div>
            <div class="Goods-button">
                <a-button class="btn" type="primary" status="success" @click="add()">新增商品</a-button>
                <a-button class="btn" type="primary" status="success" @click="deleteGood()">删除商品</a-button>
            </div>
            <DataTable :columns="GoodsColumns" :address="GoodsAddress" :id="'gid'" :checkbox="true"
                v-model:selectKey="selectKey" ref="goodsTable" v-model:visible="visible" v-model:modify="form.modify"
                :editor="true" v-model:modifyData="modifyData">
            </DataTable>
            <a-modal v-model:visible="visible" :title="formTitle" width="50%">
                <div class="modal-content">
                    <a-form v-if="form" :model="form" :rules="rules">
                        <div class="form-content">
                            <a-form-item label="商品名" field="name" label-col-flex="80px" validate-trigger="blur">
                                <a-input v-model="form.name" placeholder="请输入商品名" />
                            </a-form-item>
                            <a-form-item label="商家id" field="mid" label-col-flex="80px" validate-trigger="blur">
                                <a-input-number v-model="form.mid" placeholder="请输入商家id" hide-button />
                            </a-form-item>
                            <a-form-item label="商品价格" field="price" label-col-flex="80px" validate-trigger="blur">
                                <a-input-number v-model="form.price" placeholder="请输入商品价格" hide-button />
                            </a-form-item>
                            <a-form-item label="是否上架" field="enabled" label-col-flex="80px" validate-trigger="blur">
                                <a-switch v-model="form.enabled" :loading="loading" checked-color="#23C343"
                                    unchecked-color="#F53F3F" type="round" @change="enabledChange">
                                    <template #checked>
                                        上架
                                    </template>
                                    <template #unchecked>
                                        下架
                                    </template>
                                </a-switch>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
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
import { del, post, put } from '@/api/api'
import { Message } from '@arco-design/web-vue'
let loading = ref(false)
let selectKey = ref()
let visible = ref(false)
let modifyData = ref()
let formTitle = ref('添加商品')
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const goodsTable = ref()
const GoodsAddress = '/shop/goods/page'
const GoodsColumns = [
    {
        title: '商品id',
        dataIndex: 'gid',
    },
    {
        title: '商品名',
        dataIndex: 'name',
    },
    {
        title: '所属商户',
        dataIndex: 'mid',
    },
    {
        title: '商品价格',
        dataIndex: 'price',
    },
    {
        title: '是否上架',
        dataIndex: 'enabled',
        render: (value: any) => {
            return value.record.enabled ? '启用' : '禁用'
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
const form = ref({
    gid: null,
    enabled: false,
    mid: null,
    name: "",
    price: null,
    modify: false
})
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
    price: [
        {
            required: true,
            message: '价格不能为空',
        },
    ],
    enabled: [
        {
            required: true,
            message: '地址不能为空',
        }
    ],
}
watch(modifyData, (value) => {
    if (form.value.modify) {
        formTitle.value = '修改商品'
        form.value.gid = value.gid
        form.value.name = value.name
        form.value.mid = value.mid
        form.value.price = value.price
        form.value.enabled = value.enabled
    }

})
function add() {
    formTitle.value = '添加商品'
    form.value.name = ''
    form.value.price = null
    form.value.mid = null
    form.value.enabled = false
    form.value.modify = false
    modifyData.value = {}
    visible.value = true
}
function handleBeforeOk() {
    loading.value = true
    if (form.value.name == '' || form.value.name == null || form.value.price == undefined) {
        Message.error('请输入商品名称')
        loading.value = false
    } else if (form.value.mid == '' || form.value.mid == null || form.value.mid == undefined) {
        Message.error('请输入商户id')
        loading.value = false
    } else if (form.value.price == '' || form.value.price == null || form.value.price == undefined) {
        Message.error('请输入商品价格')
        loading.value = false
    } else {
        post(
            '/shop/goods',
            {
                name: form.value.name,
                mid: form.value.mid,
                price: form.value.price,
                enabled: form.value.enabled
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('添加成功')
                goodsTable.value.getlist()
                visible.value = false
                loading.value = false
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
    loading.value = true
    if (form.value.name == '' || form.value.name == null || form.value.price == undefined) {
        Message.error('请输入商品名称')
        loading.value = false
    } else if (form.value.mid == '' || form.value.mid == null || form.value.mid == undefined) {
        Message.error('请输入商户id')
        loading.value = false
    } else if (form.value.price == '' || form.value.price == null || form.value.price == undefined) {
        Message.error('请输入商品价格')
        loading.value = false
    } else {
        put(
            `/shop/goods/${form.value.gid}`,
            {
                name: form.value.name,
                mid: form.value.mid,
                price: form.value.price,
                enabled: form.value.enabled
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                goodsTable.value.getlist()
                visible.value = false
                loading.value = false
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
function enabledChange(value: boolean) {
    form.value.enabled = value
}
function deleteGood() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.error('请选择要删除的商品')
    } else {
        del(
            `/shop/goods/${selectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                goodsTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
</script>

<style lang='scss' scoped>
.Goods-button {
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
