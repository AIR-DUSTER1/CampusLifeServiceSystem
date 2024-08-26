<template>
    <!-- 树形控件，用于展示具有复选功能的菜单项 -->
    <a-tree style="margin-right: 20px;" :blockNode="true" :fieldNames="{
        key: 'id',
        title: 'name',
        children: 'children',
    }" :checkable="true" v-model:checked-keys="checkedKeys" ref="tree" size="medium" :data="treeData" />
    <!-- 显示当前选中的节点keys -->
    {{ checkedKeys }}
</template>

<script setup lang='ts'>
import { ref, shallowRef, onMounted, reactive, computed, getCurrentInstance, type ComponentInternalInstance, watch } from 'vue'
import { get, put } from '@/api/api'
import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue';
defineExpose({ modify })
// 初始化用户信息存储库和相关变量
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
let treeData: any = reactive([])
let checkedKeys = shallowRef<number[]>([]);
let roleid = defineModel<number>('id')
let tree = ref()
let cache = reactive<any>([])
let haveChecked = shallowRef(false)
// 获取当前组件实例以便于强制更新
watch(roleid, (value, oldValue) => {
    if (oldValue != value) {
        cache.forEach((it: any) => {
            if (it.roleid == value) {
                checkedKeys.value = it.checkedKeys
                return haveChecked.value = true
            }
        })
        if (!haveChecked.value) {
            checkedKeys.value = []
            initTree()
        }
    }
})
// 初始化树形数据结构
function initTree() {
    // 获取所有菜单数据
    get(
        `/user/menu/role/${roleid.value}`,
        { Authorization: 'Bearer ' + userInfo.value.access_token },
    ).then((res: any) => {
        // 如果获取成功
        if (res.success) {
            // 将菜单数据存储到菜单存储库
            checkedKeys.value = convertStringArrayToNumberArray(res.data.checked)
            cache.push({
                roleid: roleid.value,
                checkedKeys: checkedKeys.value
            })
            treeData = res.data.menus
        } else {
            Message.error(res.message)
        }
    })
}
function convertStringArrayToNumberArray(stringArray: string[]): number[] {
    return stringArray.map(item => Number(item));
}
// 组件挂载后加载数据
onMounted(() => {
    initTree()
})
function modify() {
    put(
        `/user/role/${roleid.value}/menu`,
        // {
        //     menuIds: form.menuIds
        // },
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res) => {
        if (res.success) {
            Message.success('修改成功')
            return true
        } else {
            Message.error(res.message)
            return false
        }
    }).catch((err) => {
        Message.error(err.message)
        return false
    })
}

</script>

<style lang='scss' scoped></style>
