<template>
    <div class="foreground-layout">
        <a-row class="grid">
            <a-col class="foreheader-container" :span="24">
                <foreHeader></foreHeader>
            </a-col>
            <a-col :span="24" class="banner-container">
                <banner></banner>
            </a-col>
        </a-row>
        <forecontent />
    </div>
</template>

<script setup lang='ts'>
import foreHeader from '@/components/foreground/layout/header/foreheader.vue'
import forecontent from '@/components/foreground/layout/content/forecontent.vue'
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue'
import { useWindowSize } from '@vueuse/core'
import banner from '@/components/foreground/layout/content/banner.vue'
const { width, height } = useWindowSize()
onBeforeMount(() => {
    const setViewportSize = () => {

        console.log(width.value);

        if (width.value < 320) {
            document.documentElement.style.minWidth = '320px';
        } else {
            document.documentElement.style.minWidth = '';
        }

        if (width.value > 1024) {
            document.documentElement.style.maxWidth = '1024px';
            document.documentElement.style.marginLeft = 'auto';
            document.documentElement.style.marginRight = 'auto';
        } else {
            document.documentElement.style.maxWidth = '';
            document.documentElement.style.marginLeft = '';
            document.documentElement.style.marginRight = '';
        }
    };

    const resizeHandler = () => {
        setViewportSize();
    };

    setViewportSize(); // 初始设置

    onMounted(() => {
        window.addEventListener('resize', resizeHandler);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', resizeHandler);
    });
}
)

</script>

<style lang='scss' scoped>
.foreground-layout {
    background-color: rgb(245, 245, 245);

    .grid {
        height: 100%;

        .foreheader-container {
            display: flex;
            justify-content: space-between;
            height: 56px;
            background: #1fa2ff;
            /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, rgb(31, 162, 255), rgb(18, 216, 250), rgb(166, 255, 203));
            /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, rgb(31, 162, 255), rgb(18, 216, 250), rgb(166, 255, 203));
            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            align-items: center;
        }

        .banner-container {
            height: 180px !important;
        }
    }
}
</style>