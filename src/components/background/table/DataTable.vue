<template>
    <a-table :scroll="{ maxHeight: '75vh' }" column-resizable size="small" :columns="columns" :loading="loading"
        :row-selection="checkbox ? rowSelection : undefined" :bordered="{ cell: true }" :pagination="false" row-key="id"
        :data="data" :filter-icon-align-left="true" @change="handleChange">
        <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
            <div class="custom-filter">
                <a-space direction="vertical">
                    <a-button-group>
                        <a-input-search placeholder="请输入搜索的内容" :model-value="filterValue[0]"
                            @input="(value: string) => setFilterValue([value])" @search="handleFilterConfirm"
                            search-button :button-props="{ status: 'normal' }">
                        </a-input-search>
                        <a-button status="danger" @click="handleFilterReset">
                            <template #icon>
                                <icon-close />
                            </template>
                        </a-button>
                    </a-button-group>
                </a-space>
            </div>
        </template>
        <template #action="{ record }">
            <span>
                <a-button type="primary" size="small" @click="editor(record)">
                    <template #icon>
                        <icon-edit />
                    </template>
                    编辑
                </a-button>
            </span>
        </template>
        <template #avatar="{ record }">
            <a-avatar :size="35" :imageUrl=record.avatar />
        </template>
        <template #cover="{ record }">
            <a-image :width="50" :height="50" :imageUrl=record.cover />
        </template>
    </a-table>
    <a-pagination :total="table.total" :current="table.pageNumber"
        @change="(pageNumber: number) => table.pageNumber = pageNumber"
        @page-size-change="(pageSize: number) => table.pageSize = pageSize" hide-on-single-page show-total show-jumper
        show-page-size></a-pagination>
    <a-modal v-model:visible="visible" width="60vw" title="编辑" @before-ok="handleBeforeOk" @cancel="handleCancel">
        <slot name="BasicForm">
            <EditorForm v-model:form="form" />
        </slot>
        <slot name="stuForm">

        </slot>
        <slot name="teachForm">

        </slot>
    </a-modal>
</template>

<script setup lang='ts'>
import { reactive, shallowRef, onMounted, getCurrentInstance, type ComponentInternalInstance, watchEffect } from 'vue'
import { get } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import router from '@/router'
import EditorForm from '@/components/background/EditorForm/EditorForm.vue'

let loading = shallowRef(true)
let userStore = useUserStore()
let visible = shallowRef(false);
let form = reactive({
    number: '',
    username: '',
    email: '',
    phone: '',
    sex: '',
    idNumber: '',
    enabled: '',
    locked: '',
    avatar: '',
})

const props = defineProps(['checkbox', 'editor'])
const rowSelection = reactive<any>({
    type: 'checkbox',
    showCheckedAll: true,
    checkbox: true,
})
let userInfo = userStore.getUserInfo()
const update = getCurrentInstance() as ComponentInternalInstance | null
let address = defineModel('address')
let columns: any = defineModel('columns')
let table = reactive({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
})
let data = reactive([]);
onMounted(() => {
    getlist()
})
watchEffect(() => {
    getlist()
})
function getlist() {
    loading.value = true
    get(
        `${address.value}`,
        { "token": userInfo.token },
        {
            page: table.pageNumber,
            pageSize: table.pageSize,
        },
    ).then((res: any) => {
        data = res.data.records
        table.total = res.data.total
        update!.proxy!.$forceUpdate()
        loading.value = false
    })
}
const handleChange = (data: any, extra: any, currentDataSource: any) => {
    console.log('change', data, extra, currentDataSource)
}
function editor(value: any) {
    console.log(props.editor);
    if (props.editor == true) {
        visible.value = true
    } else {
        router.push({
            path: '/background/ContentManager/editor',
            query: {
                slug: value.slug
            }
            // params: {
            //     item: value
            // }
        })
    }
    console.log(value);
}
const handleBeforeOk = (done: any) => {
    console.log(form)
    window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
    }, 3000)
};
const handleCancel = () => {
    visible.value = false;
}

</script>

<style lang='scss' scoped>
.custom-filter {
    padding: 20px;
    background: var(--color-bg-5);
    border: 1px solid var(--color-neutral-3);
    border-radius: var(--border-radius-medium);
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
    display: flex;
    justify-content: space-between;
}
</style>
