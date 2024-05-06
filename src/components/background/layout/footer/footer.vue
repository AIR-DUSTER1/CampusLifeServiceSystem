<template>
    <span class="footer-container">
        <a-card class="footer-card"> Copyright © {{ projectName }} 2024 </a-card>
    </span>
</template>

<script lang="ts" setup name="backfooter">
import { projectName } from '@/setting/setting'
import { useWindowSize } from '@vueuse/core'
import { shallowRef, watch, onMounted } from 'vue';

// 使用窗口大小钩子和Vueuse提供的useWindowSize来获取窗口宽度
const { width } = useWindowSize()
let footerwidth = shallowRef() // 创建一个响应式引用来存储footer宽度
let collapsed = defineModel('collapsed') // 声明一个响应式变量，可能用于侧边栏的折叠状态
let footerposition = defineModel('footerposition') // 声明一个响应式变量，用于定义footer的位置

// 组件挂载时触发，初始化footer宽度
onMounted(() => {
    getfooterwidth()
})

/**
 * 根据侧边栏的折叠状态调整footer宽度。
 * 如果侧边栏折叠，则footer宽度为窗口宽度减去55px；
 * 如果侧边栏未折叠，则footer宽度为窗口宽度减去207px。
 */
function getfooterwidth() {
    if (collapsed.value) {
        footerwidth.value = width.value - 55 + 'px'
    } else {
        footerwidth.value = width.value - 207 + 'px'
    }
}

// 监听collapsed变量的变化，以调整footer宽度
watch(collapsed, () => {
    getfooterwidth()
})

</script>

<style lang="scss" scoped>
.footer-container {
    position: v-bind(footerposition); // 动态绑定footer的位置
    bottom: 3px;
    width: v-bind(footerwidth); // 动态绑定footer的宽度
    transition: all 0.3s;

    .footer-card {
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-top: 5px;

        :deep(.arco-card-body) {
            padding: 0;
        }
    }
}
</style>