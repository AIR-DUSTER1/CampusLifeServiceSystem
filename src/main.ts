import './assets/main.scss'
import { createApp } from 'vue'
import { setupPinia } from '@/stores/pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)
setupPinia(app)
app.use(router)
app.mount('#app')
