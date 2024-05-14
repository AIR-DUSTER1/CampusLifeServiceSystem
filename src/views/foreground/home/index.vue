<template>
    <div class="forecontent">
        <a-col :span="24" class="banner-container">
            <banner :v-model:news="news"></banner>
        </a-col>
        <a-grid :cols="{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }" :colGap="2" :rowGap="2" class="grid-app">
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
            <a-grid-item class="app-item">item</a-grid-item>
        </a-grid>
        <Catagory v-if="flag">
            <span>校园新闻</span>
            <template #newsbutton>
                <a-button type="primary" shape="round" @click="tomore('校园新闻')">更多</a-button>
            </template>
            <template #news>
                <a-list size="small">
                    <a-list-item v-for="(item, index) in news" @click="selectlist(item, 'news')" :key="index">
                        <a-list-item-meta>
                            <template #title>
                                <a-typography-title :heading="6" bold>{{ item.title }}</a-typography-title>
                            </template>
                            <template #description>
                                <a-typography-text :ellipsis="ellipsis">{{ item.title }}</a-typography-text>
                            </template>
                            <template #avatar>
                                <a-image height="60" width="90" show-loader
                                    :src="item.cover ? item.cover : 'https://joeschmoe.io/api/v1/random'" />
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </template>
        </Catagory>
        <Catagory v-if="flag">
            <span>通知公告</span>
            <template #noticebutton>
                <a-button type="primary" shape="round" @click="tomore('通知公告')">更多</a-button>
            </template>
            <template #notice>
                <a-list size="small">
                    <a-list-item v-for="(item, index) in notice" :key="index" @click="selectlist(item, 'notice')">
                        {{ item.title }}
                    </a-list-item>
                </a-list>
            </template>
        </Catagory>
    </div>
</template>

<script setup lang='ts'>
import { get } from '@/api/api'
import Catagory from '@/components/foreground/layout/content/Catagory.vue'
import banner from '@/components/foreground/layout/content/banner.vue'
import { onMounted, reactive, shallowRef } from 'vue'
import router from '@/router'
let news = reactive<any>([])
let notice = reactive<any>([])
let ellipsis = reactive({
    rows: 2
})
let flag = shallowRef(false)
onMounted(() => {
    getnews()
    getnotice()
})

async function getnews() {
    await get('/news/top6').then((res: any) => {
        news = res.data
        flag.value = true
    })
}
async function getnotice() {
    get('/notice/top6').then((res: any) => {
        notice = res.data
    });
}
function tomore(title: string) {
    router.push({ path: '/foreground/MoreActicles', query: { title: title } })
}
function selectlist(item: any, address: string) {
    router.push({ path: '/foreground/acticle', query: { id: item.slug, address: address } })
}
</script>

<style lang='scss' scoped>
.forecontent {
    width: 100%;

    .banner-container {
        margin-top: 56px;
        height: 180px !important;
    }

    .grid-app {
        .app-item {
            height: 56px;
            line-height: 48px;
            color: var(--color-white);
            background-color: goldenrod;
            text-align: center;
        }
    }

}

.grid-demo .arco-col>div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.grid-demo .arco-col:nth-child(2n)>div {
    background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo .arco-col:nth-child(2n + 1)>div {
    background-color: var(--color-primary-light-4);
}

.grid-demo-grid {
    width: 100%;

}

.grid-demo-grid .demo-item {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
}
</style>
