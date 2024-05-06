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
      component: () => import("@/views/background/background.vue"),
      children: [
        {
          path: "/background",
          redirect: "/background/index",
        },
        {
          path: "index",
          component: () => import("@/views/background/home/home.vue"),
          meta: { title: "首页" }
        },
        {
          path: 'SystemManager',
          children: [
            {
              path: "RoleManager",
              component: () => import("@/views/background/RoleManager/role.vue"),
              meta: { title: "角色管理" }
            },
            {
              path: 'StuinfoManager',
              component: () => import("@/views/background/StuinfoManager/Stuinfo.vue"),
              meta: { title: "学生信息管理" }
            }
          ],
          meta: { title: "系统管理" }
        },
        {
          path: 'ContentManager',
          children: [
            {
              path: "NewsEditor",
              component: () => import("@/views/background/article/NewsEditor.vue"),
              meta: { title: '新闻管理' }
            },
            {
              path: "BulletinEditor",
              component: () => import("@/views/background/article/NewsEditor.vue"),
              meta: { title: '公告管理' }
            }
          ],
          meta: { title: "内容管理" }
        },
        {
          path: 'result',
          component: () => import("@/views/result.vue"),
          meta: { title: "结果页" }
        }
      ],
      meta: { title: "后台管理", isAuth: false },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        const userinfo: UserState = userStore.getUserInfo()
        // console.log(to);
        if (to.meta.isAuth == false && userinfo.role == 2 || userinfo.role == 3) {
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
    },

  ]
})
router.afterEach((to: any, from) => {
  document.title = to.meta.title
})
export default router
