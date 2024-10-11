<template>
    <a-card>
        <div>
            <div class="order-button">
                <a-button class="btn" type="primary" status="success" @click="cancel()">取消订单</a-button>
                <a-button class="btn" type="primary" status="success" @click="refund()">账户退款</a-button>
            </div>
            <DataTable :columns="OrdersColumns" :address="OrdersAddress" :id="'orderNo'" :checkbox="true"
                v-model:selectKey="selectKey" :radio="true" ref="OrderTable">
            </DataTable>
            <a-modal v-model:visible="visible" title="取消订单" width="50%" @ok="handleBeforeOk">
                <div class="modal-content">
                    <a-textarea v-model="cancelReason" placeholder="请输入取消理由" show-word-limit :max-length="50" auto-size
                        allow-clear />
                </div>
                <template #footer>

                </template>
            </a-modal>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, h, reactive, computed } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import { post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let selectKey = ref()
let visible = ref()
let cancelReason = ref()
const OrderTable = ref()
const OrdersAddress = '/card/order/page'
const OrdersColumns = reactive([
    {
        title: '订单号',
        dataIndex: 'orderNo',
    },
    {
        title: '卡号',
        dataIndex: 'cardNo',
        filterable: {
            filter: (value: string, record: any) => record.operName.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付时间',
        dataIndex: 'payTime',
        filterable: {
            filter: (value: string, record: any) => record.operUrl.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '支付方式',
        dataIndex: 'payType',
    },
    {
        title: '支付状态',
        dataIndex: 'payStatus',
        filterable: {
            filter: (value: string, record: any) => record.operLocation.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        },
        render: (value: any) => {
            if (value.record.payStatus == 1) {
                return '未支付'
            } else if (value.record.payStatus == 2) {
                return '已支付'
            } else if (value.record.payStatus == 3) {
                return '退款 '
            } else if (value.record.payStatus == 4) {
                return '取消'
            }
        }
    },
    {
        title: '支付流水号',
        dataIndex: 'traceNo',
        filterable: {
            filter: (value: string, record: any) => record.requestMethod.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch)
        }
    },
    {
        title: '取消原因',
        dataIndex: 'cancelReason',
    },
    {
        title: '取消时间',
        dataIndex: 'cancelTime',
    }
])
function cancel() {
    visible.value = true
}

function handleBeforeOk() {
    if (selectKey.value != '' || selectKey.value != null || selectKey.value != undefined) {
        post(
            `card/order/${selectKey.value}/cancel`,
            { cancelReason: cancelReason.value },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('取消成功')
                OrderTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else {
        Message.error('请选择要取消的订单')
    }
}
function refund() {
    if (selectKey.value != '' || selectKey.value != null || selectKey.value != undefined) {
        post(
            `/card/order/${selectKey.value}/refund`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('退款成功')
                OrderTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else {
        Message.error('请选择要退款的订单')
    }
}
</script>

<style lang='scss' scoped>
.order-button {
    text-align: end;
    margin: 0.625rem;

    .btn {
        margin-left: 0.625rem;
    }
}
</style>
