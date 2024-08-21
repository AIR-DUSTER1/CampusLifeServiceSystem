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
                router.replace('/login')
            })
        }, 1500)
    }
    else if (response.status === 403) {
        Message.error("该用户没用权限访问")
        if (router.currentRoute.value.path.split('/')[1] === '/background') {
            setTimeout(() => {
                router.push('/background/result?status=403')
            }, 1500)
        }

    } else if (response.status === 404) {
        Message.error("请求的资源不存在")
        if (router.currentRoute.value.path.split('/')[1] === '/background') {
            setTimeout(() => {
                router.push('/background/result?status=404')
            }, 1500)
        }
    } else if (response.status === 500) {
        Message.error("服务器内部错误")
        if (router.currentRoute.value.path.split('/')[1] === '/background') {
            setTimeout(() => {
                router.push('/background/result?status=500')
            }, 1500)
        }
    }
    return response
}