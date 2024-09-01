<template>
    <!-- 树形控件，用于展示具有复选功能的菜单项 -->
    <a-tree v-if="menuData && menuData.length > 0" style="margin-right: 20px;" :blockNode="true" :fieldNames="{
        key: 'id',
        title: 'name',
        children: 'children',
    }" :checkable="true" v-model:checked-keys="selectedKeys" ref="tree" size="medium" :data="menuData" />
    <!-- 显示当前选中的节点keys -->
    {{ selectedKeys }}
</template>

<script setup lang='ts'>
import { ref, shallowRef, onMounted, reactive, computed, getCurrentInstance, type ComponentInternalInstance, watch } from 'vue'
import { get, put } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
// 初始化用户信息存储库和相关变量
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let menuData = reactive([]) // 更改为 menuData
let selectedKeys = defineModel<number[]>('selectedKeys') // 更改为 selectedKeys
let roleId = defineModel<number>('roleId') // 更改为 roleId
let menuCache = reactive<any>(new Map()) // 更改为 menuCache
let hasSelected = shallowRef(false) // 更改为 hasSelected

watch(roleId, (newRoleId, oldRoleId) => {
    if (oldRoleId !== newRoleId) {
        const cachedMenu = menuCache.get(newRoleId)
        if (cachedMenu) {
            selectedKeys.value = cachedMenu.checkedKeys
            hasSelected.value = true
        } else {
            selectedKeys.value = []
            initializeMenuTree()
        }
    }
})

function initializeMenuTree() {
    get(`/user/menu/role/${roleId.value}`, { Authorization: 'Bearer ' + userInfo.value.access_token })
        .then((response: any) => {
            if (response.success) {
                selectedKeys.value = response.data.checked
                menuCache.set(roleId.value, {
                    roleId: roleId.value,
                    checkedKeys: response.data.checked
                })
                menuData = response.data.menus
            } else {
                console.error('无法获取菜单：', response);
                Message.error(response.message)
            }
        })
        .catch((error: any) => {
            console.error('获取菜单时发生网络错误：', error);
            Message.error('无法获取菜单数据，请检查网络连接')
        })
}

onMounted(() => {
    initializeMenuTree()
})
// Keys = defineModel<number[]>('checkedKeys')
// let roleid = defineModel<number>('id')
// let tree = ref()
// let cache = reactive<any>([])
// let haveChecked = shallowRef(false)
// // 获取当前组件实例以便于强制更新
// // 当roleid发生变化时执行该监听函数
// watch(roleid, (value, oldValue) => {
//     // 检查roleid是否确实发生了变化
//     if (oldValue != value) {
//         // 遍历缓存中的每一项，寻找匹配新roleid的项
//         cache.forEach((it: any) => {
//             // 如果找到匹配项，则更新checkedKeys并标记为已检查
//             if (it.roleid == value) {
//                 checkedKeys.value = it.checkedKeys
//                 return haveChecked.value = true
//             }
//         })
//         // 如果没有找到匹配项，则重置checkedKeys并重新初始化树结构
//         if (!haveChecked.value) {
//             checkedKeys.value = reactive<any>([])
//             initTree()
//         }
//     }
// })
// // 初始化树形数据结构
// function initTree() {
//     // 获取所有菜单数据
//     get(
//         `/user/menu/role/${roleid.value}`,
//         { Authorization: 'Bearer ' + userInfo.value.access_token },
//     ).then((res: any) => {
//         // 如果获取成功
//         if (res.success) {
//             // 将菜单数据存储到菜单存储库
//             checkedKeys.value = res.data.checked
//             cache.push({
//                 roleid: roleid.value,
//                 checkedKeys: checkedKeys.value
//             })
//             treeData = res.data.menus
//         } else {
//             Message.error(res.message)
//         }
//     }).catch((err: any) => {
//         Message.error(err)
//     })
// }

// // 组件挂载后加载数据
// onMounted(() => {
//     initTree()
// })
</script>

<style lang='scss' scoped></style>
