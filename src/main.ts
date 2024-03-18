import './assets/main.scss'
import ArcoVue from '@arco-design/web-vue';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css';

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: 'arco'
});
app.use(createPinia())
app.use(router)

app.mount('#app')
