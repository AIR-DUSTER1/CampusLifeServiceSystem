import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/home/login.vue'
import Register from '@/views/home/register.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    }
  ]
})

export default router
