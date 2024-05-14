<template>
  <a-tabs type="card" class="tabs" hide-content :editable="true" :active-key="activekey" animation @tab-click="tabclick"
    @delete="handleDelete" auto-switch>
    <a-tab-pane v-for="item of currentRoute" :key="item.key" :title="item.title" :closable="item.key !== 0">
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useSessionStorage } from '@vueuse/core'
// 定义当前路由信息的接口
interface currentRoute {
  key: number | string,
  path: string,
  title: string
}
// 使用vue-router获取当前路由信息，并初始化路由列表
const router = useRouter()
let currentRoute = reactive<currentRoute[]>([{
  key: 0,
  path: "/background/index",
  title: "首页"
}])
let activekey = ref() // 当前活动的tab键值
let tabs = {
  key: 0,
  path: "",
  title: ""
}
onMounted(() => {
  let currentRoutecache = useSessionStorage('currentRoute', currentRoute)
  currentRoute = currentRoutecache.value
  let existobj = plagiarismCheck((router.currentRoute.value.meta.title) as string)
  if (!existobj.exist) {
    active((existobj.pathWithSameName) as number | string)
  }
})
// 路由更新前的钩子，用于更新tab信息和添加新的tab
onBeforeRouteUpdate((updateGuard: any) => {
  tabs.path = updateGuard.fullPath
  tabs.title = updateGuard.meta.title
  tabs.key++ // 更新tabs的key值以确保唯一
  let existobj = plagiarismCheck(updateGuard.meta.title) // 检查是否存在相同的标题
  if (existobj.exist) {
    let lastRoutekey: number = (currentRoute[currentRoute.length - 1].key as number)
    currentRoute.push({
      key: ++lastRoutekey,
      path: tabs.path,
      title: tabs.title
    })
    useSessionStorage('currentRoute', currentRoute)
    active(lastRoutekey) // 激活新添加的tab
  } else if (!existobj.exist && existobj.pathWithSameName != undefined) {
    active(existobj.pathWithSameName)
  }
})
/**
 * 删除指定的tab
 * @param key 要删除的tab的键值
 */
function handleDelete(key: number | string) {
  currentRoute.forEach((item: any, index: number) => {
    if (item.key == key) {
      currentRoute.splice(index, 1) // 从数组中删除对应的tab
      useSessionStorage('currentRoute', currentRoute.splice(index, 1))
    }
  })
  if (activekey.value == key) {
    activekey.value = currentRoute[currentRoute.length - 1].key
    tabclick(activekey.value)
  }
};
/**
 * 点击tab时的处理函数
 * @param key 被点击的tab的键值
 */
function tabclick(key: string | number) {
  active(key) // 设置当前活动的tab
  for (let i = 0; i < currentRoute.length; i++) {
    if (currentRoute[i].key == key) {
      router.push(currentRoute[i].path) // 跳转到对应的路由
    }
  }
}
/**
 * 检查是否存在同名的tab
 * @param title 待检查的tab标题
 * @returns 返回是否存在同名的tab
 */
function plagiarismCheck(title: string) {
  for (let i = 0; i < currentRoute.length; i++) {
    if (currentRoute[i].title == title) {
      return { exist: false, pathWithSameName: currentRoute[i].key } // 存在同名tab则返回false和当前tab的key值
    }
  }
  return { exist: true } // 不存在同名tab则返回true
}
/**
 * 设置当前活动的tab键值
 * @param key 要设置为活动的tab的键值
 */
function active(key: string | number) {
  activekey.value = key
}
</script>

<style lang='scss' scoped>
.tabs {
  :deep(.arco-tabs-tab-active) {
    background-color: #e5e5e5;
    color: #000;
    font-weight: 500;
  }
}
</style>