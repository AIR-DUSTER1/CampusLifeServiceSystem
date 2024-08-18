<template>
    <div>
        <a-collapse>
            <a-collapse-item key="1">
                <template #header>

                </template>
                <template #extra>
                    <icon-copy />
                </template>
                <div>Beijing Toutiao Technology Co., Ltd.</div>
                <div>Beijing Toutiao Technology Co., Ltd.</div>
            </a-collapse-item>
            <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :key="2">
                <template #extra>
                    <a-button type="primary" size="mini" @click.stop="sayHello">hello</a-button>
                </template>
                <div>
                    <a-button type="primary" size="mini" @click.stop="sayHello">hello</a-button>
                </div>
                <div>Beijing Toutiao Technology Co., Ltd.</div>
            </a-collapse-item>
            <a-collapse-item :show-expand-icon="false" header="Beijing Toutiao Technology Co., Ltd." key="3">
                <template #extra>
                    <a-tag size="small">city</a-tag>
                </template>
            </a-collapse-item>
        </a-collapse>
    </div>
</template>

<script setup lang='ts'>
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'
function sayHello() {
    Message.info('hello');
}
</script>

<style lang='scss' scoped></style>
