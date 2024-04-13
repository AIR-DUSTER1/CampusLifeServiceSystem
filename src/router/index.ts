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
          redirect: '/home/login',
        },
        {
          path: "login",
          component: () => import("@/views/home/login/login.vue"),
          meta: { title: "登录" }
        },
        {
          path: "register",
          component: () => import("@/views/home/register/register.vue"),
          meta: { title: "注册" }
        },
        {
          path: "forgotPassword",
          component: () => import("@/views/home/forgotPassword/forgotPassword.vue"),
          meta: { title: "忘记密码" }
        }
      ],
      component: () => import("@/views/home/index.vue")
    },
    {
      path: "/background",
      component: () => import("@/views/background/index.vue"),
      // children: [
      //   {
      //     path: "/background",
      //     redirect: "/background/index",
      //   },
      //   {
      //     path: "user",
      //     component: () => import("@/views/background/index/user/index.vue"),
      //     meta: { title: "用户管理" }
      //   },
      //   {
      //     path: "role",
      //     component: () => import("@/views/background/index/role/index.vue"),
      //     meta: { title: "角色管理" }
      //   }],
      meta: { title: "后台管理", isAuth: false },
      beforeEnter: (to, from, next) => {
        localStorage.getItem("")
        if (to.meta.isAuth == false) {

        }
      }
    },
    {
      path: "/foreground",
      component: () => import("@/views/foreground/index.vue")
    },
    {
      path: "/ai",
      component: () => import("@/components/foreground/layout/content/Ai.vue")
    }
  ]
})
router.afterEach((to: any, from) => {
  console.log(to, from)
  document.title = to.meta.title
})
export default router
