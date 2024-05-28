import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import background from './background'
import foreground from './foreground'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    home,
    background,
    foreground,
  ]
})
router.afterEach((to: any, from) => {
  document.title = to.meta.title
})
export default router
