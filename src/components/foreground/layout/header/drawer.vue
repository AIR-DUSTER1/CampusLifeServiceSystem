<template>
    <div>
        <icon-menu-fold size="32" class="cursor-pointer" @click="handleClick" />
        <a-drawer :width="200" :height="340" :visible="visible" @cancel="handleCancel" :header="false" :footer="false"
            placement="left" unmountOnClose>
            <Menu v-model:collapsed="collapsed"></Menu>
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
let collapsed = ref(true)
let visible = ref(false)
let menuList = reactive([])
const handleClick = () => {
    visible.value = !visible.value
    collapsed.value = false
};
const handleCancel = () => {
    visible.value = false
    collapsed.value = true
}
function handleMenuItemClick(item: any) {

}
</script>
<style lang='scss' scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
