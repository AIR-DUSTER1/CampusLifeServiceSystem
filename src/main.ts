import './assets/main.scss'
import { createApp } from 'vue'
import { setupPinia } from '@/stores/pinia'
import App from './App.vue'
import router from './router'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
const app = createApp(App)
setupPinia(app)
app.use(router)
app.use(ArcoVueIcon)
app.mount('#app')
