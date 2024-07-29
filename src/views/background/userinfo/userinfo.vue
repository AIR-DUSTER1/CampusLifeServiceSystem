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
                    <userform v-show="form" v-model:form="form" />
                </a-card>
            </a-tab-pane>
            <a-tab-pane key="1">
                <template #title>
                    <icon-idcard />
                    <span>账户管理</span>
                </template>
                <a-card>

                </a-card>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import useUserStore from '@/stores/modules/user'
import userform from '@/components/background/userform/userform.vue'
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
            label: '性别',
            value: userinfo.value.sex
        },
        {
            label: '年龄',
            value: userinfo.value.age
        },
        {
            label: '手机号',
            value: userinfo.value.phone
        },
        {
            label: '邮箱',
            value: userinfo.value.mail
        },
        {
            label: '院系',
            value: userinfo.value.department
        }
    ]
)
</script>

<style lang='scss' scoped>
.userinfo {}
</style>
