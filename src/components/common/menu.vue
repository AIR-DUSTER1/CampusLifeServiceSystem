<template>
    <div class="menu-demo">
        <!-- 菜单 -->
        <a-menu v-if="flag" theme="light" :selected-keys="[$route.fullPath]" :collapsed="collapsed" accordion
            breakpoint="xl">
            <template v-for="(item, index) in  menuList " :key="item.id">
                <!-- 一级菜单 -->
                <a-sub-menu v-if="item.children && item.children?.length > 0" :key="item.id">
                    <template #icon>
                        <component :is="item.icon" />
                    </template>
                    <template #title>{{ item.title }}</template>
                    <!-- 子菜单项 -->
                    <a-menu-item v-for="child in item.children" @click="handleMenuItemClick(child)" :key="child.url">
                        {{ child.title }}
                    </a-menu-item>
                </a-sub-menu>
                <!-- 无子菜单的一级菜单 -->
                <a-menu-item v-if="item.children?.length == 0" @click="handleMenuItemClick(item)" :key="item.url">
                    <component :is="item.icon" />{{ item.title }}
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { get } from '@/api/api'
import { onMounted, reactive, shallowRef, ref } from 'vue'
import { Message, Result } from '@arco-design/web-vue'
import router from '@/router'
import useUserStore from '@/stores/modules/user'
import { useBrowserLocation } from '@vueuse/core'
let collapsed = defineModel('collapsed')
let selected = shallowRef()
let userStore = useUserStore()
let flag = ref(false)
let userInfo = userStore.getUserInfo()
let menuList = reactive([
    {
        "id": 0,
        "title": "首页",
        "icon": "icon-bug",
        "url": ""
    },
    {
        "id": 1,
        "title": "菜单项一",
        "icon": "icon-bug",
        "children": [
            {
                "id": 1,
                "title": "菜单项一",
                "icon": "icon-name",
                "url": "",
                "children": []
            },
            {
                "id": 2,
                "title": "菜单项二",
                "icon": "icon-name",
                "children": []
            }
        ]
    },
    {
        "id": 2,
        "title": "菜单项一",
        "icon": "icon-bug",
        "children": [
            {
                "id": 1,
                "title": "新闻编辑",
                "icon": "icon-name",
                "url": "/background/NewEditor",
                "children": []
            },
        ]
    },
    {
        "id": 3,
        "title": "菜单项一",
        "icon": "icon-bug",
        "children": []
    }
])
onMounted(() => {
    get(
        "/console/column/list",
        { "token": userInfo.token }
    )
        .then((res: any) => {
            menuList = res.data
            flag.value = true
        })
        .catch((err) => {
            Message.error(err.message)
        })
})
function handleMenuItemClick(item: any,) {
    router.push(item.url)
}
</script>
<style lang="scss" scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    // background-color: #232324;
}
</style>