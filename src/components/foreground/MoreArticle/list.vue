<template>
    <a-list :max-height="height - 88" size="small" :data="data" @reach-bottom="fetchData" :scrollbar="scrollbar">
        <template #header>
            {{ title }}
        </template>
        <template #scroll-loading>
            <div v-if="bottom">没有更多文章了</div>
            <a-spin v-else />
        </template>
        <template v-if="title == '通知公告'" #item="{ item, index }">
            <a-list-item>
                <a-list-item-meta :description="item.slug">
                    <template #title>
                        <a-typography-text>{{ item.title }}</a-typography-text>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
        <template v-if="title == '通知公告'" #item="{ item, index }">
            <a-list-item>
                <a-list-item-meta class="list-item-meta">
                    <template #title>
                        <a-typography-title :heading="5" style="margin-top: 10px;margin-top: 0;">{{ item.title
                            }}</a-typography-title>
                    </template>
                    <template #description>
                        <a-typography-text :ellipsis="{ rows: 2 }" style="margin-bottom: 0;">{{ item.slug
                            }}</a-typography-text>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
        <template v-if="title == '校园新闻'" #item="{ item, index }">
            <a-list-item>
                <template #extra>
                    <div className="image-area">
                        <a-image width="80" height="80" :src="item.cover" />
                    </div>
                </template>
                <a-list-item-meta class="list-item-meta">
                    <template #title>
                        <a-typography-title :heading="5" style="margin-top: 10px;margin-top: 0;">{{ item.title
                            }}</a-typography-title>
                    </template>
                    <template #description>
                        <a-typography-text :ellipsis="{ rows: 2 }" style="margin-bottom: 0;">{{ item.slug
                            }}</a-typography-text>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup lang='ts'>
import { reactive, ref, toRaw, onUpdated, nextTick, getCurrentInstance, type ComponentInternalInstance } from 'vue'
import { useWindowSize, useDebounceFn } from '@vueuse/core'
import { get } from '@/api/api'
let { title } = defineProps(['title'])
let address = defineModel('address')
let regetarticle = defineModel('regetarticle')
let current = ref(1)
let bottom = ref(false)
let data = reactive<any>([])
const scrollbar = ref(true)
const { height } = useWindowSize()
let scrollbarheight = ref(height.value - 88)
const update = getCurrentInstance() as ComponentInternalInstance | null
const fetchData = () => {
    console.log(scrollbarheight.value)
    if (bottom.value == false) {
        nextTick(() => {
            getarticle()
        })
    }
}
onUpdated(() => {
    console.log("update", regetarticle.value);
    if (address.value == "/news/page" && regetarticle.value) {
        data.length = 0
        current.value = 1
        getarticle()
        regetarticle.value = false
        bottom.value = false
    } else if (address.value == "/notice/page" && regetarticle.value) {
        data.length = 0
        current.value = 1
        getarticle()
        regetarticle.value = false
        bottom.value = false
    }
})
let getarticle = useDebounceFn(() => {
    {
        get(
            `${address.value}`,
            {},
            {
                page: current.value,
                pageSize: 15
            }
        ).then((res: any) => {
            if (res.data.records.length > 0) {
                data.push(...res.data.records)
                current.value += 1

            } else {
                bottom.value = true
            }
        }).then(() => {
            if (
                regetarticle.value
            ) {
                update!.proxy!.$forceUpdate()
            }
        })
    }
}, 100)
</script>

<style lang='scss' scoped>
.list-item-meta {
    :deep(.arco-list-item-meta-description) {
        margin-right: 10px;
    }

    :deep(.arco-list-item-meta-title) {
        margin-right: 10px;
    }
}
</style>
