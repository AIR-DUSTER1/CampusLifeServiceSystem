import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
import userinfo from './module/userinfo/userinfo'
const background = {
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
                },
                {
                    path: "CalendarEditor",
                    component: () => import("@/views/background/calendar/CalendarMannager.vue"),
                    meta: { title: "日历编辑" }
                },
                {
                    path: "editor",
                    component: () => import("@/views/background/editor/editor.vue"),
                    meta: { title: "编辑" }
                }
            ],
            meta: { title: "内容管理" }
        },
        {
            path: 'result',
            component: () => import("@/views/result.vue"),
            meta: { title: "结果页" }
        },
        userinfo
    ],
    meta: { title: "后台管理" },
    beforeEnter: (to: any, from: any, next: any) => {
        const userStore = useUserStore()
        let index = userStore.authorities.indexOf('admin')

        if (index !== -1) {
            next()
        } else {
            Message.error('你没有访问权限！请联系管理员')
        }
    }
}
export default background 