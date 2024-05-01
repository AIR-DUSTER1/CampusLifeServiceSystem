<template>
  <a-tabs type="card" hide-content  :editable="true" @add="handleAdd" @delete="handleDelete" auto-switch>
    <a-tab-pane v-for="(item, index) of data" :key="item.id" :title="item.title" :closable="index !== 0">
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ref, onMounted } from 'vue'
let data = ref([
  {
    id: '1',
    title: 'Tab 1',
  }
])
let count = 1
onMounted(() => {
  console.log(router.getRoutes());
})
const handleAdd = () => {
  const number = count++;
  data.value = data.value.concat({
    id: `${number}`,
    title: `New Tab ${number}`,
  })
};
const handleDelete = (id) => {
  console.log(id);
  
  data.value = data.value.filter(item => item.id !== id)
};
</script>

<style lang='scss' scoped></style>
