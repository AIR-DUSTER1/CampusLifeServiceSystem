<template>
    <div>
        <icon-menu-fold size="32" class="cursor-pointer" @click="handleClick" />
        <a-drawer :width="200" :height="340" :visible="visible" @cancel="handleCancel" :header="false" :footer="false"
            placement="left" unmountOnClose>
            <a-menu v-for="item in menuList" :key="item.id" theme="light" :collapsed="!visible" accordion
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
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const visible = ref(false);
let menuList = reactive([
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
                "title": "菜单项一",
                "icon": "icon-name",
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
const handleClick = () => {
    visible.value = !visible.value;
};
const handleCancel = () => {
    visible.value = false;
}
function handleMenuItemClick(item: any) {

}
</script>
<style lang='scss' scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
