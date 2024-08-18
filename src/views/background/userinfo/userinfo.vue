<template>
    <div class="userinfo">
        <a-tabs position="left">
            <a-tab-pane key="0">
                <template #title>
                    <icon-user />
                    <span>个人信息</span>
                </template>
                <a-card>
                    <a-descriptions style="margin-top: 20px" :data="user" size="medium" :column="2" v-show="!form">
                        <template #title>
                            <div
                                style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                                <a-typography-title :heading="3" style="margin: 0">
                                    个人信息
                                </a-typography-title>
                                <a-button @click="form = !form" type="primary">编辑</a-button>
                            </div>
                        </template>
                        <template #value="{ value, index, data }">
                            <a-avatar v-if="data.label === '头像'">
                                <img alt="avatar" :src="value" />
                            </a-avatar>
                            <template v-else>{{ value }}</template>
                        </template>
                    </a-descriptions>
                    <userform v-if="form" v-model:form="form" />
                </a-card>
            </a-tab-pane>
            <a-tab-pane key="1">
                <template #title>
                    <icon-idcard />
                    <span>账户管理</span>
                </template>
                <accountlist />
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #title>
                    <icon-file />
                    <span>登录日志</span>
                </template>
                <SecurityLog></SecurityLog>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import userform from '@/components/background/userform/userform.vue'
import accountlist from '@/components/background/AccountList/AccountList.vue'
import SecurityLog from '@/components/background/SecurityLog/SecurityLog.vue'
const store = useUserStore()
let form = ref(false)
const userinfo = computed(() => store.userinfo)
let user = reactive<any>(
    [
        {
            label: '头像',
            value: userinfo.value.avatar
        },
        {
            label: '姓名',
            value: userinfo.value.username
        },
        {
            label: '工号',
            value: userinfo.value.number
        },
        {
            label: '性别',
            value: userinfo.value.sex
        },
        {
            label: '手机号',
            value: userinfo.value.phone ? userinfo.value.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") : ""
        },
        {
            label: '邮箱',
            value: userinfo.value.email ? userinfo.value.email.replace(/^(.{3}).*(.{9})$/, "$1****$2") : ""
        },
        {
            label: '院系',
            value: userinfo.value.department
        },
        {
            label: '身份证',
            value: userinfo.value.idNumber
        }
    ]
)
watch(userinfo, (value) => {
    console.log(value);
    user[0].value = value.avatar
    user[1].value = value.username
    user[2].value = value.number
    user[3].value = value.sex
    user[4].value = value.phone
    user[5].value = value.email
    user[6].value = value.department
    user[7].value = value.idNumber
})
</script>

<style lang='scss' scoped>
.userinfo {}
</style>
