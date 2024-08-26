import useUserStore from '@/stores/modules/user'
import { Message } from '@arco-design/web-vue'
import UserInfo from './module/UserInfo/UserInfo'
import home from './module/home/home'
import SystemManager from './module/SystemManager'
import { NewsManager, NewsEditor } from './module/NewsManager'
import LifeManager from './module/LifeManager'
// import CarManager from './module/CarManager'
const background = {
    path: "/background",
    component: () => import("@/views/background/background.vue"),
    children: [
        {
            path: "/background",
            redirect: "/background/index",
        },
        home,
        SystemManager,
        NewsManager,
        NewsEditor,
        LifeManager,
        // CarManager,
        {
            path: 'result',
            component: () => import("@/views/result.vue"),
            meta: { title: "结果页" }
        },
        UserInfo
    ],
    meta: { title: "后台管理" },
    beforeEnter: (to: any, from: any, next: any) => {
        const userStore = useUserStore()
        let index = userStore.authorities.indexOf('ROLE_STUDENT')
        // next()
        if (userStore.authorities[0] != '' && index == -1) {
            next()
        } else {
            Message.error('你没有访问权限！请联系管理员')
        }
    }
}
export default background 