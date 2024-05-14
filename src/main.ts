import './assets/main.scss'
import ArcoVue from '@arco-design/web-vue'
import { createApp } from 'vue'
import { setupPinia } from '@/stores/pinia'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: 'arco'
})
setupPinia(app)
app.use(router)
app.use(ArcoVueIcon)
app.mount('#app')
