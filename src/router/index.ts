import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import background from './background'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    home,
    background,
  ],

})
router.afterEach((to: any, from) => {
  document.title = to.meta.title
})
export default router
