import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      children: [
        {
          path: '/home',
          redirect: '/home/login'
        },
        {
          path: "login",
          component: () => import("@/views/home/login/login.vue")
        },
        {
          path: "register",
          component: () => import("@/views/home/register/register.vue")
        },
        {
          path: "forgotPassword",
          component: () => import("@/views/home/forgotPassword/forgotPassword.vue")
        }
      ],
      component: () => import("@/views/home/index.vue")
    },
    {
      path: "/background",
      component: () => import("@/views/background/index.vue")
    }
  ]
})

export default router
