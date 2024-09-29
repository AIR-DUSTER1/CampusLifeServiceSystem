<template>
    <a-card>
        <div>
            <div class="leave-button">
                <a-button class="btn" type="primary" status="success" @click="approve()">同意请假</a-button>
                <a-button class="btn" type="primary" status="success" @click="revoke()">撤销申请</a-button>
            </div>
            <DataTable :columns="leaveColumns" :id="'lid'" :address="LeaveApi" :checkbox="true"
                v-model:selectKey="selectKey" ref="LeaveTable">
            </DataTable>
        </div>
    </a-card>

</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import DataTable from '@/components/background/table/DataTable.vue'
import { post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
let selectKey = ref()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const LeaveApi = '/life/leave/page'
const LeaveTable = ref()
const leaveColumns = ref([
    {
        title: '请假编号',
        dataIndex: 'lid',
    },
    {
        title: '姓名',
        dataIndex: 'username',
    },
    {
        title: '请假类型',
        dataIndex: 'type',
    },
    {
        title: '开始时间',
        dataIndex: 'start',
    },
    {
        title: '结束时间',
        dataIndex: 'end',
    },
    {
        title: '请假离校',
        dataIndex: 'leavingSchool',
    },
    {
        title: '请假不归寝',
        dataIndex: 'notGoingToBed',
    },
    {
        title: '请假回宿',
        dataIndex: 'returnDormitory',
    },
    {
        title: '原因',
        dataIndex: 'type',
    },
])
function approve() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.error('请选择要操作的请假记录')
    } else {
        post(
            `/life/leave/${selectKey.value}/approve`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('操作成功')
                LeaveTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function revoke() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.error('请选择要撤销的请假记录')
    } else {
        post(
            `/life/leave/${selectKey.value}/revoke`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('撤销申请成功')
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
.leave-button {
    text-align: end;
    margin: 0.625rem;

    .btn {
        margin-left: 0.625rem;
    }
}
</style>
