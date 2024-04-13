<template>
    <div>
        <div :style="{ marginTop: '20px' }">
            <icon-menu-fold @click="handleClick" />
        </div>
        <a-drawer :width="200" :height="340" :visible="visible" :header="false" :footer="false" placement="left"
            unmountOnClose>

            <div></div>
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const visible = ref(false);

const handleClick = () => {
    visible.value = true;
};

</script>
<style lang='scss' scoped></style>
