<template>
    <a-table v-if="columns[0].title != ''" :data="data" table-layout-fixed :scroll="{ maxHeight: '85vh' }" :hoverable="form.hover"
        :loading="form.loading" :row-selection="rowSelection">
        <template #columns>
            <a-table-column title="角色名称" data-index="rolename" v-for="{ title, id, dataIndex } in columns" :key="id">
                <template #title>
                    {{ title }}
                </template>
                <template #cell="{ record , rowIndex }">
                    {{ record[dataIndex] }}
                    <div v-if="dataIndex == 'avatar'">
                        <a-avatar
                                imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" /></div>
                </template>
            </a-table-column>
        </template>
    </a-table>
</template>

<script setup lang='ts'>
import { reactive, onMounted } from 'vue'
import {post} from '@/api/api'
let BasicColumns = defineModel('columns')
let flag:boolean = false
const form = reactive({
    borderCell: false,
    hover: true,
    loading: false,
})
const rowSelection = reactive<any>({
    type: 'checkbox',
    showCheckedAll: true,
    checkbox: true,
});
let columns = reactive<any>([
    {
        id: 0,
        title: '',
        dataIndex: '',
    },
])

const data = [{
    id: 1,
    number: "",
    name: 'Jane Doe',
    phone: 23000,
    idCard: '32 Park Road, London',
    email: 'jane.doe@example.com',
    sex: "",
    state: "",
    avatar: ""
},
{
    id: 2,
    name: 'Alisa Ross',
    phone: 25000,
    idCard: '35 Park Road, London',
    email: 'alisa.ross@example.com',
    sex: "",
    state: "",
    avatar: ""
},
{
    id: 3,
    name: 'Kevin Sandra',
    phone: 22000,
    idCard: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
    sex: "",
    state: "",
    avatar: ""
},
{
    id: 4,
    name: 'Ed Hellen',
    phone: 17000,
    idCard: '42 Park Road, London',
    email: 'ed.hellen@example.com',
    sex: "",
    state: "",
    avatar: ""
},
{
    id: 5,
    name: 'William Smith',
    phone: 27000,
    idCard: '62 Park Road, London',
    email: 'william.smith@example.com',
    sex: "",
    state: "",
    avatar: ""
}];
onMounted(() => {
    console.log(BasicColumns.value)
    columns = BasicColumns.value
    Bacsicinfo()
})
function Bacsicinfo() {
    // post('/console/user/basic/page',
    // {

    // }
    // )
}
</script>

<style lang='scss' scoped></style>
