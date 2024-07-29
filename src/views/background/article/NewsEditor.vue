<template>
    <div>
        <DataTable v-model:address="address" v-model:columns="columns">
        </DataTable>
    </div>
</template>

<script setup lang='ts' name='NewsEditor'>
import DataTable from '@/components/background/table/DataTable.vue'
import { ref, reactive, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
let address = ref('')
let notice = reactive([{
    title: '标题',
    dataIndex: 'title',
    width: 200
},
{
    title: '作者',
    dataIndex: 'author',
    width: 120
},
{
    title: '内容',
    dataIndex: 'content',
    width: 120
},
{
    title: '时间',
    dataIndex: 'updateTime',
    width: 120
},
{
    title: '修改者',
    dataIndex: 'updateuser',
    width: 120
},
{
    title: '操作',
    dataIndex: 'action',
    width: 110,
    slotName: "action"
}])
let news = reactive([
    {
        title: '标题',
        dataIndex: 'title',
        width: 200
    },
    {
        title: '封面',
        dataIndex: 'cover',
        width: 60,
        slotName: "cover"
    },
    {
        title: '作者',
        dataIndex: 'author',
        width: 120
    },
    {
        title: '内容',
        dataIndex: 'content',
        width: 120
    },
    {
        title: '时间',
        dataIndex: 'updateTime',
        width: 120
    },
    {
        title: '修改者',
        dataIndex: 'updateuser',
        width: 120
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 110,
        slotName: "action"
    }
])
let columns = reactive<any>([])
let route = useRoute()
determineCurrentRoute()
onBeforeRouteUpdate(() => {
    console.log(1);

    determineCurrentRoute()
})
onMounted(() => {

    console.log();

})
function determineCurrentRoute() {
    if (route.fullPath.split('/')[3] == 'BulletinEditor') {
        address.value = '/notice/page'
        columns = notice
    } else if (route.fullPath.split('/')[3] == 'NewsEditor') {
        address.value = '/news/page'
        columns = news
    }
}
</script>

<style lang='scss' scoped></style>
