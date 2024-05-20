<template>
    <a-drawer :visible="visible" placement="bottom" :footer="false" @ok="handleOk" @cancel="handleCancel"
        unmountOnClose>
        <template #title>
            上传图片
        </template>
        <a-button-group style="width: 100%;height: 100%;justify-content:center;flex-direction:column">
            <a-button type="outline" style="height: 100%;width: 100%;margin-bottom: 1px;">
                <template #icon>
                    <icon-camera />
                </template>
            </a-button>
            <a-button type="outline" style="height: 100%;width: 100%;">
                <template #icon>
                    <icon-folder-add />
                </template>
            </a-button>
        </a-button-group>
    </a-drawer>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useDevicesList } from '@vueuse/core'
const {
    devices,
    videoInputs: cameras,
    audioInputs: microphones,
    audioOutputs: speakers,
} = useDevicesList()
let visible = defineModel<any>('visible')
console.log(visible.value);

const handleOk = () => {
    visible.value = false;
};
const handleCancel = () => {
    visible.value = false;
}

</script>

<style lang='scss' scoped></style>
