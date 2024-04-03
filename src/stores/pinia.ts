import { createPinia } from 'pinia'
import type { App } from 'vue'
import persist from './plugin/persist'

const pinia = createPinia()
pinia.use(persist)

export function setupPinia(app: App) {
  app.use(pinia)
}

export default pinia
