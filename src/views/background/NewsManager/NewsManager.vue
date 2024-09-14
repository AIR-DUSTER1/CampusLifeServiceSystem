<template>
    <div>
        <div class="news-button">
            <a-button class="btn" type="primary" status="success"
                @click="router.push('/background/NewsEditor')">新增文章</a-button>
            <a-button class="btn" type="primary" status="success" @click="deleteNews">删除文章</a-button>
        </div>
        <DataTable v-model:address="address" v-model:visible="visible" v-model:columns="notice" :checkbox="true"
            :id="'nid'" v-model:select-key="selectKey" v-model:modifyData="form" ref="table">
        </DataTable>
        <a-modal v-model:visible="visible" title="修改文章" width="50%">
            <div class="modal-content">
                <a-form v-if="form" :model="form">
                    <div class="form-content">
                        <a-form-item label="标题" prop="title" label-col-flex="40px">
                            <a-input v-model="form.title" />
                        </a-form-item>
                        <a-form-item label="简介" prop="description" label-col-flex="40px">
                            <a-input v-model="form.description" />
                        </a-form-item>
                        <a-form-item label="作者" prop="author" label-col-flex="40px">
                            <a-input v-model="form.author" />
                        </a-form-item>
                        <a-form-item label="内容" prop="content" label-col-flex="40px">
                            <a-button type="primary" @click="modify" style="width: 100%;">编辑</a-button>
                        </a-form-item>
                        <a-form-item label="封面" prop="cover" label-col-flex="40px" class="cover">
                            <a-upload :action="uploadAddress" :fileList="file ? [file] : []" :show-file-list="false"
                                :headers="headers" @change="onChange" @progress="onProgress" @success="onSuccess"
                                @error="onError" style="width: 100%;" :accept="type">
                                <template #upload-button>
                                    <div :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                    }`">
                                        <div class="arco-upload-list-picture custom-upload-avatar" v-if="form.cover">
                                            <img :src="form.cover" />
                                            <div class="arco-upload-list-picture-mask">
                                                <IconEdit />
                                            </div>
                                            <a-progress v-if="file && file.status === 'uploading' && file.percent < 100"
                                                :percent="file.percent" type="circle" size="mini" :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                }" />
                                        </div>
                                        <div class="arco-upload-picture-card" v-else>
                                            <div class="arco-upload-picture-card-text">
                                                <IconPlus />
                                                <div style=" font-weight: 600">未设置</div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </a-upload>
                        </a-form-item>
                        <a-form-item label="发布" prop="published" label-col-flex="40px">
                            <a-switch v-model="form.published" :loading="loading" checked-color="#23C343"
                                unchecked-color="#F53F3F" type="round" @change="change">
                                <template #checked>
                                    启用
                                </template>
                                <template #unchecked>
                                    未启用
                                </template>
                            </a-switch>
                        </a-form-item>
                    </div>
                </a-form>
            </div>
            <template #footer>
                <div class="modal-footer">
                    <a-button style="margin-right: .625rem;" @click="visible = false">取消</a-button>
                    <a-button type="primary" @click="updateNews(form.nid, form)">修改</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import { del, put } from '@/api/api'
import DataTable from '@/components/background/table/DataTable.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, computed } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
import { ApiAddress } from '@/setting/setting'
import { watch } from 'vue'
const file = ref()
const router = useRouter()
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let uploadAddress = ref(ApiAddress + '/file/upload')
const headers = reactive({
    Authorization: 'Bearer ' + userInfo.value.access_token
})
let type = ref('.jpg,.jpeg,.png,.gif,.bmp,.svg,.webp')//上传文件类型限制
const table = ref()
let address = ref('/news/page')
let selectKey = ref([])
let loading = ref(false)
let visible = ref(false)
let form = ref({
    nid: '',
    title: '',
    description: '',
    author: '',
    cover: '',
    content: '',
    published: '',
    url: ''
})
let notice = reactive([{
    title: '标题',
    dataIndex: 'title',
},
{
    title: '作者',
    dataIndex: 'author',
},
{
    title: '内容',
    dataIndex: 'content',
    slotName: "content",
    minWidth: 120
},
{
    title: '封面',
    dataIndex: "cover",
    slotName: 'cover'
},
{
    title: '简介',
    dataIndex: 'description'
},
{
    title: '浏览量',
    dataIndex: 'views'
},
{
    title: '发布',
    dataIndex: 'published',
},
{
    title: '时间',
    dataIndex: 'updateTime',
    slotName: 'updateTime'
},
{
    title: '修改者',
    dataIndex: 'updateBy',
    slotName: 'updateBy'
},
{
    title: '操作',
    dataIndex: 'newsEditor',
    width: 170,
    slotName: "newsEditor"
}])
onBeforeRouteUpdate(() => {

})
onMounted(() => {
    console.log();
})
watch(() => router.currentRoute.value.query.save, (value) => {
    if (value) {
        table.value.getlist()
    }
})
function deleteNews() {
    del(
        `/news/${selectKey.value}`,
        { Authorization: 'Bearer ' + userInfo.value.access_token },
    ).then((res) => {
        if (res.success) {
            Message.success(res.message)
            table.value.getlist()
            selectKey.value = []
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
    console.log(selectKey)
}
function updateNews(id: string | number, form: any) {
    if (id != '' && id != undefined && id != null) {
        put(
            `/news/${id}`,
            {
                ...form
            },
            { Authorization: 'Bearer ' + userInfo.value.access_token },
        ).then((res: any) => {
            if (res.success) {
                Message.success('修改成功')
                table.value.getlist()
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function change(value: any) {
    if (value) {
        put(
            `/news/${form.value.nid}/publish`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token },
        ).then((res: any) => {
            if (res.success) {
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    } else {
        put(
            `/news/${form.value.nid}/unpublish`,
            {},
            { Authorization: 'Bearer ' + userInfo.value.access_token },
        ).then((res: any) => {
            if (res.success) {
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function modify() {
    router.push({
        path: '/background/NewsEditor',
        query: {
            nid: form.value.nid
        }
    })
    visible.value = false
}
const onChange = (_: any, currentFile: any) => {
    file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
    }
}
const onProgress = (currentFile: any) => {
    file.value = currentFile
}
function onSuccess(file: any) {
    form.value.cover = file.response.data.url
}
function onError(file: any) {

}
</script>

<style lang='scss' scoped>
.news-button {
    display: flex;
    justify-content: flex-end;

    .btn {
        margin: 5px;
    }
}

.cover {
    :deep(.arco-upload-picture-card) {
        width: 100%;
    }
}


.modal-content {
    .form-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }


}

// :deep(.arco-table-cell) {
//     height: 3.125rem;
// }

:deep(.arco-table-td-content) {
    height: 100%;

}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
