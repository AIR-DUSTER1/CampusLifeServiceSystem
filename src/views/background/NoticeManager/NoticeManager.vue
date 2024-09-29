<template>
    <a-card>
        <div>
            <div class="notice-button">
                <a-button class="btn" type="primary" status="success" @click="addNotice()">新增通知</a-button>
                <a-button class="btn" type="primary" status="success" @click="deleteNotice()">删除通知</a-button>
            </div>
            <DataTable :columns="noticeColumns" :address="noticeAddress" :id="'nid'" :checkbox="true"
                v-model:selectKey="selectKey" ref="noticeTable" v-model:visible="visible" v-model:modify="form.modify"
                :editor="true" v-model:modifyData="modifyData">
            </DataTable>
            <a-modal v-model:visible="visible" :title="formTitle" :width="'50%'" :ok-loading="loading"
                @ok="handleSubmit">
                <a-form v-if="form" :model="form" :rules="rules" ref="formRef">
                    <div class="form-content">
                        <a-form-item label="通知标题" field="title" label-col-flex="70px">
                            <a-input v-model="form.title" placeholder="请输入通知标题"></a-input>
                        </a-form-item>
                        <a-form-item label="通知内容" field="content" label-col-flex="70px">
                            <a-input v-model="form.content" placeholder="请输入通知内容"></a-input>
                        </a-form-item>
                        <a-form-item v-if="form.modify" label="通知内容" field="content" label-col-flex="70px">
                            <a-switch v-model="form.published" :loading="loading" checked-color="#23C343"
                                unchecked-color="#F53F3F" type="round" @change="publishedChange">
                                <template #checked>
                                    发布
                                </template>
                                <template #unchecked>
                                    禁用
                                </template>
                            </a-switch>
                        </a-form-item>
                    </div>
                </a-form>
            </a-modal>
        </div>
    </a-card>
</template>

<script setup lang='ts'>
import { del, post, put } from '@/api/api';
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue';
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let visible = ref(false)
let loading = ref(false)
let selectKey = ref()
let modifyData = ref({})
let formTitle = ref('添加通知')
const form = ref({
    nid: '',
    title: '',
    content: '',
    published: false,
    modify: false
})
const formRef = ref()
const noticeAddress = '/system/notice/page'
const noticeColumns = [
    {
        title: '公告编号',
        dataIndex: 'nid',
    },
    {
        title: '公告标题',
        dataIndex: 'title',
    },
    {
        title: '公告内容',
        dataIndex: 'content',
    },
    {
        title: '发布',
        dataIndex: 'published',
        render: (text: any) => {
            return text.record.published ? '已发布' : '未发布'
        }
    },
    {
        title: '操作时间',
        dataIndex: 'updateTime',
        slotName: 'updateTime'
    },
    {
        title: '操作人',
        dataIndex: 'updateBy',
        slotName: 'updateBy'
    },
    {
        title: '操作',
        slotName: 'action'

    }
]
const noticeTable = ref()
const rules = {
    title: [
        {
            required: true,
            message: '请输入通知标题',
            trigger: ['blur', 'change'],
        },
    ],
    content: [
        {
            required: true,
            message: '请输入通知内容',
            trigger: ['blur', 'change'],
        },
    ],
}
watch(modifyData, (value: any) => {
    if (form.value.modify) {
        formTitle.value = '修改通知'
        form.value.nid = value.nid
        form.value.title = value.title
        form.value.content = value.content
        form.value.published = value.published
    }
})
function addNotice() {
    formTitle.value = '添加通知'
    form.value.title = ''
    form.value.content = ''
    form.value.modify = false
    modifyData.value = {}
    visible.value = true
}
function handleSubmit() {
    formRef.value.validate().then(() => {
        loading.value = true
        if (form.value.modify) {
            modifyNotice()
        } else {
            post(
                '/system/notice',
                {
                    title: form.value.title,
                    content: form.value.content
                },
                { Authorization: 'Bearer ' + userInfo.value.access_token }
            ).then((res) => {
                if (res.success) {
                    Message.success('添加成功')
                    visible.value = false
                    loading.value = false
                    noticeTable.value.getlist()
                } else {
                    Message.error(res.message)
                    loading.value = false
                }
            }).catch((err) => {
                Message.error(err)
                loading.value = false
            })
        }
    })
}
function modifyNotice() {
    if (form.value.nid == '' || form.value.nid == null || form.value.nid == undefined) {
        Message.error('请选择要修改的通知')
    } else {
        put(
            `/system/notice/${form.value.nid}`,
            {
                title: form.value.title,
                content: form.value.content
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('修改成功')
                visible.value = false
                loading.value = false
                noticeTable.value.getlist()
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function publishedChange(value: boolean) {
    loading.value = true
    if (value) {
        put(
            `/system/notice/${form.value.nid}/published`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                loading.value = false
                Message.success('发布成功')
                noticeTable.value.getlist()
            } else {
                loading.value = false
                Message.error(res.message)
            }
        }).catch((err) => {
            loading.value = false
            Message.error(err)
        })
    } else {
        put(
            `/system/notice/${form.value.nid}/close`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                loading.value = false
                Message.success('禁用成功')
                noticeTable.value.getlist()
            } else {
                loading.value = false
                Message.error(res.message)
            }
        }).catch((err) => {
            loading.value = false
            Message.error(err)
        })
    }
}
function deleteNotice() {
    if (selectKey.value == '' || selectKey.value == null || selectKey.value == undefined) {
        Message.error('请选择要删除的通知')
    } else {
        del(
            `/system/notice/${selectKey.value}`,
            { Authorization: 'Bearer ' + userInfo.value.access_token }
        ).then((res) => {
            if (res.success) {
                Message.success('删除成功')
                noticeTable.value.getlist()
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
.notice-button {
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
