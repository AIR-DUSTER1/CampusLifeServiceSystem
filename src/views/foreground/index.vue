<template>
  <div class="foreground-layout">
    <a-row class="grid-demo">
      <a-col :span="24">
        <foreHeader></foreHeader>
      </a-col>
      <a-col :span="24">
        <div>col - 12</div>
      </a-col>
      <a-grid :cols="{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }" :colGap="2" :rowGap="2" class="grid-demo-grid">
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
      </a-grid>
    </a-row>
    <card>

    </card>
  </div>

</template>

<script setup lang='ts'>
import foreHeader from '@/components/foreground/layout/header/header.vue'
import forecontent from '@/components/foreground/layout/content/content.vue'
import forefooter from '@/components/foreground/layout/footer/footer.vue'
import foremenu from '@/components/foreground/layout/menu/menu.vue'
import card from '@/components/foreground/layout/content/card.vue'
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
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
.foreground-layout {}

.grid-demo .arco-col {
  height: 48px;
  color: var(--color-white);
}

.grid-demo .arco-col>div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.grid-demo .arco-col:nth-child(2n)>div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo .arco-col:nth-child(2n + 1)>div {
  background-color: var(--color-primary-light-4);
}

.grid-demo-grid {
  width: 100%;

}

.grid-demo-grid .demo-item {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
