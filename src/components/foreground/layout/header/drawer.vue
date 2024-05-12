<template>
    <div>
        <icon-menu-fold size="32" class="cursor-pointer" @click="handleClick" />
        <a-drawer :width="200" :height="340" class="drawer" :visible="visible" @cancel="handleCancel" :header="false"
            :footer="false" placement="left" unmountOnClose>
            <Menu v-model:collapsed="collapsed" v-model:menuList="menuList" v-model:flag="flag"></Menu>
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import { get } from '@/api/api'
import { ref, reactive, onMounted } from 'vue'
import Menu from "@/components/common/menu.vue"
import { Message } from '@arco-design/web-vue'

let collapsed = ref(true)
let visible = ref(false)
let menuList = reactive([])
let flag = ref(false)
onMounted(() => {
    getmenu()
})
const handleClick = () => {
    visible.value = !visible.value
    collapsed.value = false
}
const handleCancel = () => {
    visible.value = false
    collapsed.value = true
}
function handleMenuItemClick(item: any) {

}
async function getmenu() {
    await get('/column/list').then((res: any) => {
        menuList = res.data
        flag.value = true
    })
        .catch((err) => {
            Message.error(err.message)
        })
}
</script>
<style lang='scss' scoped>
.cursor-pointer {
    cursor: pointer;
}

.drawer {

    :deep(.arco-drawer-body) {
        padding: 0px;
        background-color: black;
    }
}
</style>
