<template>
    <!-- 树形控件，用于展示具有复选功能的菜单项 -->
    <a-tree style="margin-right: 20px;" :blockNode="true" :checkable="true" v-model:checked-keys="checkedKeys"
        ref="tree" @check="onCheck" size="medium" :data="treeData" :key="treeData[0].key" />
    <!-- 显示当前选中的节点keys -->
    {{ checkedKeys }}
</template>

<script setup lang='ts'>
import { ref, shallowRef, onMounted, reactive, nextTick, getCurrentInstance, type ComponentInternalInstance, watch } from 'vue'
import { get } from '@/api/api'
import useUserStore from '@/stores/modules/user'
// 初始化用户信息存储库和相关变量
let userStore = useUserStore()
let userInfo = userStore.getUserInfo()
let checkedKeys = shallowRef([]);
let id = shallowRef<number>()
let roleid = defineModel<number>('id')
let flag = shallowRef(false)
let tree = ref()
// 获取当前组件实例以便于强制更新
const update = getCurrentInstance() as ComponentInternalInstance | null
// 初始化树形数据结构
let treeData = reactive<any>([
    {
        key: 0
    }
])
// 组件挂载后加载数据
onMounted(() => {
    getlist()
})
// 监听角色ID变化，重新加载数据
watch(roleid, (value) => {
    id.value = value
    getlist()
})
// 获取树形数据列表
async function getlist() {
    id.value = roleid.value
    await get(
        `/console/role/column/${id.value}`,
        { 'token': userInfo.token }
    ).then((res) => {
        treeData = res.data
        flag.value = true
        update!.proxy!.$forceUpdate()
    }).then(() => {
        echodata()
    })
}
// 根据后端数据设置已选中的节点
async function echodata() {
    let cache = treeData
    let checkkey = []
    // 遍历缓存中的每一项
    await cache.forEach((it: any) => {
        // 如果项中有子项
        if (it.children != null) {
            // 遍历子项中的每一项
            it.children.forEach((it: any) => {
                // 如果子项中有子项
                if (it.children != null) {
                    // 遍历子项中的每一项
                    it.children.forEach((it: any) => {
                        // 如果项被选中
                        if (it.checked) {
                            // 将选中的项的key添加到checkkey数组中
                            checkkey.push(it.key)
                            // 调用tree的checkNode方法，将checkkey和true参数传入，true表示选中状态已改变
                            tree.value.checkNode(checkkey, true)
                        }
                    })
                } else {
                    // 如果项被选中
                    if (it.checked) {
                        // 将选中的项的key添加到checkkey数组中
                        checkkey.push(it.key)
                        // 调用tree的checkNode方法，将checkkey和true参数传入，true表示选中状态已改变
                        tree.value.checkNode(checkkey, true)
                    }
                }
            });
        }
    });
}
// 函数onCheck，用于处理复选框的点击事件
function onCheck(newCheckedKeys: any, event: any) {
    // 打印新选中的键和事件
    console.log('check: ', newCheckedKeys, event);
}
</script>

<style lang='scss' scoped></style>
