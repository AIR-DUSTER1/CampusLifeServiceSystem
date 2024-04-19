import type { AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
import router from '@/router'
const userstore = useUserStore()
export default function (response: AxiosResponse): AxiosResponse {
    if (response.status === 401) {
        Message.error('当前用户登录已过期，请重新登录')
        setTimeout(() => {
            userstore.logout().then(() => {
                console.log(router);
                router.replace('/')
            })
        }, 1500)
    }
    else if (response.status === 403) {
        Message.error("该用户没用权限访问")
    } else if (response.status === 404) {
        Message.error("请求的资源不存在")
    }
    return response
}