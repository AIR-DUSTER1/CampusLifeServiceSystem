import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import type { UserState } from '@/stores/types'
import { Message } from '@arco-design/web-vue'

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
          component: () => import("@/views/home/ForgotPassword/ForgotPassword.vue"),
          meta: { title: "忘记密码" }
        }
      ],
      component: () => import("@/views/home/index.vue")
    },
    {
      path: "/background",
      component: () => import("@/views/background/index.vue"),
      children: [
        //   {
        //     path: "/background",
        //     redirect: "/background/index",
        //   },
        //   {
        //     path: "user",
        //     component: () => import("@/views/background/index/user/index.vue"),
        //     meta: { title: "用户管理" }
        //   },
        {
          path: "RoleManager",
          component: () => import("@/views/background/RoleManager/role.vue"),
          meta: { title: "角色管理" }
        },
        {
          path: 'NewEditor',
          component: () => import("@/views/background/article/NewsEditor.vue"),
          meta: { title: '新建新闻' }
        }
      ],
      meta: { title: "后台管理", isAuth: false },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        const userinfo: UserState = userStore.getUserInfo()
        console.log(to);
        if (to.meta.isAuth == false && userinfo.auth == 2 || userinfo.auth == 1) {
          next()
        } else {
          Message.error("权限不足")
        }
      }
    },
    {
      path: "/foreground",
      children: [
        {
          path: "/foreground",
          redirect: "/foreground/index",
        },
        {
          path: "index",
          component: () => import("@/views/foreground/foreground.vue"),
          meta: { title: "飞鸟智慧校园生活服务平台" }
        },
        {
          path: "HealthyLife/HealthyAi",
          component: () => import("@/views/foreground/HealthyLife/HealthyAi/Ai.vue"),
          meta: { title: "健康助手" }
        }
      ]
    }
  ]
})
router.afterEach((to: any, from) => {
  document.title = to.meta.title
})
export default router
