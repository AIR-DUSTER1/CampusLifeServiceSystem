<template>
    <div>
        <DataTable v-model:address="address" v-model:columns="notice" :checkbox="true">
        </DataTable>
    </div>
</template>

<script setup lang='ts'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, reactive, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
let address = ref('/news/page')
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
},
{
    title: '封面',
    dataIndex: "cover",
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
    title: '删除',
    dataIndex: 'deleted',
},
{
    title: '时间',
    dataIndex: 'update_time',
},
{
    title: '修改者',
    dataIndex: 'update_by',
},
{
    title: '操作',
    dataIndex: 'action',
    width: 110,
    slotName: "action"
}])
let route = useRoute()
determineCurrentRoute()
onBeforeRouteUpdate(() => {

})
onMounted(() => {
    console.log();
})
function determineCurrentRoute() {

}
</script>

<style lang='scss' scoped></style>
