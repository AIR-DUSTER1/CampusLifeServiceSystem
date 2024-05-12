<template>
    <div class="more-article">
        <div class="select-box">
            <a-select v-model="title" :options="options" @change="change" class="select" :field-names="fieldNames"
                placeholder="请选择文章类型" />
        </div>
        <morelist :title="title" v-model:address="address" v-model:regetarticle="regetarticle"></morelist>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import morelist from '@/components/foreground/MoreArticle/list.vue'
import { useRoute, } from 'vue-router'
import router from '@/router'
const value = ref()
const fieldNames = { value: 'list', label: 'text' }
const route = useRoute()
let title = ref<string>('')
let address = ref<string>('')
let regetarticle = ref<boolean>(false)
const options = reactive([
    {
        list: '校园新闻',
        text: '校园新闻'
    },
    {
        list: '通知公告',
        text: '通知公告'
    },
]);
onMounted(() => {
    title.value = (route.query.title as string)
    value.value = route.query.title
    document.title = title.value
    getaddress(title.value)
})
function change(value: any) {
    document.title = value
    getaddress(value)
    regetarticle.value = true
    console.log(value);
}
function getaddress(title: string) {
    if (title == '校园新闻') {
        address.value = '/news/page'
        router.replace({ path: '/foreground/MoreActicles', query: { title: title } })
    } else if (title == '通知公告') {
        address.value = '/notice/page'
        router.replace({ path: '/foreground/MoreActicles', query: { title: title } })
    }
}
</script>

<style lang='scss' scoped>
.more-article {
    margin-top: 56px;
    background-color: white;

    .select-box {
        text-align: center;
        background-color: white;
    }
}
</style>
