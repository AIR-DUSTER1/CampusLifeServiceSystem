<template>
    <div style="margin-right: 20px;width: 100%;">
        <a-tree-select :allow-search="true" :allow-clear="true" :data="treeData" :filter-tree-node="filterTreeNode"
            placeholder=""></a-tree-select>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
function filterTreeNode(searchValue: string, nodeData: any) {
    return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}
let treeData = reactive([
    {
        title: 'Trunk 0-0',
        key: '0-0',
        children: [
            {
                title: 'Branch 0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'Leaf 0-0-1-1',
                        key: '0-0-1-1'
                    },
                    {
                        title: 'Leaf 0-0-1-2',
                        key: '0-0-1-2'
                    }
                ]
            },
        ],
    },
])
</script>

<style lang='scss' scoped></style>
