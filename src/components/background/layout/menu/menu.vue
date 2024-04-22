<script lang="ts">
export default {
    name: "backmenu",
}
</script>
<template>
    <div class="menu-demo">
        <!-- 菜单 -->
        <a-menu v-if="flag" v-for="item in menuList" :key="item.id" theme="light" :collapsed="collapsed" accordion
            breakpoint="xl">
            <!-- 一级菜单 -->
            <a-sub-menu v-if="item.children && item.children?.length > 0" :key="item.id">
                <template #icon>
                    <component :is="item.icon" />
                </template>
                <template #title>{{ item.title }}</template>
                <!-- 子菜单项 -->
                <a-menu-item v-for="child in item.children" :key="child.id" @click="handleMenuItemClick(child)">
                    {{ child.title }}
                </a-menu-item>
            </a-sub-menu>
            <!-- 无子菜单的一级菜单 -->
            <a-menu-item v-else :key="item.id + 1" @click="handleMenuItemClick(item)">
                <component :is="item.icon" />{{ item.title }}
            </a-menu-item>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { get } from '@/api/api'
import { onMounted, reactive } from 'vue'
import { Message, Result } from '@arco-design/web-vue'
import router from '@/router'
import useUserStore from '@/stores/modules/user'
let collapsed = defineModel()
let userStore = useUserStore()
let flag = ref(false)
let userInfo = userStore.getUserInfo()
let menuList = reactive([
    {
        "id": 0,
        "title": "首页",
        "icon": "icon-bug",
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
let menulength = ref()
onMounted(() => {
    get(
        "/console/column/list",
        { "token": userInfo.token }
    )
        .then((res: any) => {
            menuList = res.data
            flag.value = true
            console.log(router.currentRoute.value.path.split('/')[1]);
        })
        .catch((err) => {
            Message.error(err.message)
        })
})

function handleMenuItemClick(item: any) {
    router.push(item.url)
    console.log(item.url);

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