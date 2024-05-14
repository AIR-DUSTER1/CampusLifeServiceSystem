<template>
    <a-card class="article">
        <a-typography v-if="flag">
            <a-typography-title class="title" style="margin: 0;">
                {{ article.title }}
            </a-typography-title>
            <a-typography-text class="description">{{ article.createTime }}</a-typography-text>
            <a-typography-paragraph v-html="article.content">
            </a-typography-paragraph>
        </a-typography>
    </a-card>
</template>

<script setup lang='ts'>
import { get } from '@/api/api'
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
const route = useRoute()
let slug = ref(route.query.id)
let flag = ref(false)
let address = ref(route.query.address)
const { height } = useWindowSize()
let cardheight = ref()
let article = reactive({
    id: 0,
    title: '',
    content: '',
    createTime: '',
})
onMounted(() => {
    getarticle()
    cardheight.value = height.value - 63 + 'px'
})
function getarticle() {
    get(
        `/${address.value}/${slug.value}`,
    ).then((res: any) => {
        article = res.data
        flag.value = true
    })
}

</script>

<style lang='scss' scoped>
.article {
    margin: 56px 5px 5px 5px;
    height: v-bind(cardheight);

    :deep(.arco-card-body) {
        padding: 0 8px;
        background-color: white;

    }

    .title {
        text-align: center;
    }

    .description {
        display: flex;
        justify-content: center;
    }
}
</style>
