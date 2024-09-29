<template>
    <a-table :scroll="{ maxHeight: '75vh' }" column-resizable size="small" :columns="props.columns" :loading="loading"
        :row-selection="checkbox ? rowSelection : undefined" @select="select" :bordered="{ cell: true }"
        v-model:selected-keys="selectKey" :pagination="false" :row-key="props.id" :data="data"
        :filter-icon-align-left="true" @change="handleChange">
        <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
            <div class="custom-filter">
                <a-space direction="vertical">
                    <a-button-group>
                        <a-input-search placeholder="请输入搜索的内容" :model-value="filterValue[0]"
                            @input="(value: string) => setFilterValue([value])" @search="handleFilterConfirm"
                            search-button :button-props="{ status: 'success' }" size="medium" style="width: 210px;">
                        </a-input-search>
                        <a-button status="danger" @click="handleFilterReset" size="medium">
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
        <template #newsEditor="{ record }">
            <a-button style="margin-right: .625rem;" type="primary" size="small"
                @click="briefEditor(record)">简编</a-button>
            <a-button type="primary" size="small" @click="contentEditor(record)">编辑</a-button>
        </template>
        <template #avatar="{ record }">
            <a-avatar :size="35" :imageUrl=record.avatar />
        </template>
        <template #cover="{ record }">
            <a-image v-if="record.cover" :width="50" :height="50" :src=record.cover preview alt="图片链接超时" />
            <span v-else>无封面</span>
        </template>
        <template #content="{ record }">
            <span class="content" v-html="record.content"></span>
        </template>
        <template #updateTime="{ record }">
            <span>{{ record.updateTime ? record.updateTime : record.createTime }}</span>
        </template>
        <template #updateBy="{ record }">
            <span>{{ record.updateBy ? record.updateBy : record.createBy }}</span>
        </template>
        <template #role="{ record }">
            <a-tag bordered color="green" v-if="record.code">{{ record.code }}</a-tag>
        </template>
    </a-table>
    <a-pagination v-if="table.total > 0" :total="table.total" :current="table.pageNumber" :page-size="table.pageSize"
        @change="(pageNumber: number) => table.pageNumber = pageNumber" :page-size-options="pageSizeOptions"
        @page-size-change="(pageSize: number) => table.pageSize = pageSize" show-total show-jumper show-page-size
        hide-on-single-page auto-adjust></a-pagination>
</template>

<script setup lang='ts'>
import { reactive, shallowRef, onMounted, getCurrentInstance, type ComponentInternalInstance, watch, computed } from 'vue'
import { get, post } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import useEditorStore from '@/stores/modules/editor'
import { useRouter } from 'vue-router'
let selectKey = defineModel<(string | number)[]>('selectKey')
defineExpose({ editor, getlist })
let loading = shallowRef(true)
const userStore = useUserStore()
const editorStore = useEditorStore()
let newsmodify = computed(() => editorStore.modify)
let modify = defineModel('modify')
let visible = defineModel('visible')
let modifyData = defineModel('modifyData')
const router = useRouter()
const props = defineProps(['checkbox', 'editor', 'id', 'userName', 'columns', 'address', 'pageSize', 'radio'])
const rowSelection = reactive<any>({
    type: props.radio ? 'radio' : 'checkbox',
    showCheckedAll: false,
    checkbox: true,
    checkStrictly: false
})
let userInfo = computed(() => userStore.userinfo)
let userName = props.userName || ''
const update = getCurrentInstance() as ComponentInternalInstance | null
let table: any = reactive({
    pageNumber: 1,
    pageSize: props.pageSize ? props.pageSize : 10,
    total: 0,
})
let pageSizeOptions = [table.pageSize == 10 ? 5 : table.pageSize, 10, 20, 50, 100]
let data = reactive([]);
onMounted(() => {
    getlist()
})
watch(() => [table.pageNumber, table.pageSize], () => {
    getlist()
})
watch(newsmodify, (value: boolean) => {
    if (value) {
        getlist()
    }
})
function getlist() {
    loading.value = true
    get(
        `${props.address}`,
        { Authorization: 'Bearer ' + userInfo.value.access_token },
        {
            page: table.pageNumber,
            pageSize: table.pageSize,
            // username: userName ? userName.trim() : ''
        },
    ).then((res: any) => {
        data = res.data.records
        table.total = res.data.total
        table.pageSize = res.data.size
        table.pageNumber = res.data.current
        update!.proxy!.$forceUpdate()
        loading.value = false
        editorStore.setModify(false)
    })
}
const handleChange = (data: any, extra: any, currentDataSource: any) => {
    console.log('change', data, extra, currentDataSource)
}
function editor(value: any) {
    console.log(props.editor, value)
    if (props.editor == true) {
        modifyData.value = value
        modify.value = true
        visible.value = true
    }
}
function select(keys: (string | number)[], key?: string | number) {
    if (keys != undefined) {
        selectKey.value = keys
    }
}
function briefEditor(record: any) {
    modifyData.value = record
    visible.value = true
}
function contentEditor(record: any) {
    router.push({
        path: '/background/NewsEditor',
        query: {
            nid: record.nid
        }
    })
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

.content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    height: 3.125rem;
}
</style>
