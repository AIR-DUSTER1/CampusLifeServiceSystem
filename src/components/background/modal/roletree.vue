<template>
    <a-tree style="margin-right: 20px;" :blockNode="true" :checkable="true" v-model:checked-keys="checkedKeys"
        ref="tree" @check="onCheck" size="medium" :data="treeData" />
    {{ checkedKeys }}
</template>

<script setup lang='ts'>
import { ref, shallowRef, onMounted, reactive } from 'vue'
let checkedKeys = shallowRef([]);
let tree = ref()

const res = [
    {
        title: '首页',
        key: '0-0',
        checked: false,
        children: null
    },
    {
        title: '一卡通',
        key: '0-1',
        checked: true,
        children: [
            {
                title: '充值',
                key: '0-1-1',
                checked: true,
                children: null
            },
        ]
    },
    {
        title: '健康生活',
        key: '0-2',
        checked: true,
        children: [
            {
                title: '健康助手',
                key: '0-2-0',
                checked: false,
                children: null
            },
            {
                title: '健康新闻',
                key: '0-2-1',
                checked: true,
                children: null
            },
        ]
    },
]
let treeData = reactive<any>([]);
treeData = res
onMounted(() => {
    echodata()
})
async function echodata() {
    let cache = treeData
    await cache.forEach((it: any) => {
        if (it.children != null) {
            it.children.forEach((it: any) => {
                if (it.checked) {
                    tree.value.checkNode(it.key, true)
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
