<template>
    <a-tree style="margin-right: 20px;" :blockNode="true" :checkable="true" v-model:checked-keys="checkedKeys"
        ref="tree" @check="onCheck" size="medium" :data="treeData" :key="treeData[0].key" />
    {{ checkedKeys }}
</template>

<script setup lang='ts'>
import { ref, shallowRef, onMounted, reactive, nextTick, getCurrentInstance, type ComponentInternalInstance, watch } from 'vue'
import { get } from '@/api/api'
import useUserStore from '@/stores/modules/user'
let userStore = useUserStore()
let userInfo = userStore.getUserInfo()
let checkedKeys = shallowRef([]);
let id = shallowRef<number>()
let roleid = defineModel<number>('id')
let flag = shallowRef(false)
let tree = ref()
const update = getCurrentInstance() as ComponentInternalInstance | null
let treeData = reactive<any>([
    {
        key: 0
    }
])
onMounted(() => {
    getlist()
})
watch(roleid, (value) => {
    id.value = value
    getlist()
})
function getlist() {
    id.value = roleid.value
    get(
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
async function echodata() {
    let cache = treeData
    let checkkey = []
    await cache.forEach((it: any) => {
        if (it.children != null) {
            it.children.forEach((it: any) => {
                if (it.children != null) {
                    it.children.forEach((it: any) => {
                        if (it.checked) {
                            checkkey.push(it.key)
                            tree.value.checkNode(checkkey, true)
                        }
                    })
                } else {
                    if (it.checked) {
                        checkkey.push(it.key)
                        tree.value.checkNode(checkkey, true)
                    }
                }
            });
        }
    });
}
function onCheck(newCheckedKeys: any, event: any) {
    console.log('check: ', newCheckedKeys, event);
}
</script>

<style lang='scss' scoped></style>
