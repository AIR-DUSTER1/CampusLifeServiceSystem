import { defineStore } from 'pinia'
import type { UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/images/logo.png'
import { nextTick } from 'vue'
import { t } from '@wangeditor/editor'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
    state: () => {
        return {
            id: 0,
            number: 0,
            auth: 0,
            token: '',
            username: '',
            avatar: defaultAvatar,
        }
    },
    actions: {
        saveUser(id?: number, number?: number, auth?: number, avatar?: string, username?: string, token?: string) {
            this.id = id || this.id
            this.number = number || this.number
            this.auth = auth || this.auth
            this.token = token || this.token
            this.username = username || this.username
            this.avatar = avatar || defaultAvatar
        },
        getUserInfo() {
            return {
                id: this.id,
                number: this.number,
                auth: this.auth,
                token: this.token,
                username: this.username,
                avatar: this.avatar,
            }
        },
        isTokenExpire() {
            return !this.token
        },
        changeNickName(newusername: string) {
            this.username = newusername
        },
        logout() {
            return new Promise<void>((resolve) => {
                this.$reset()
                localStorage.clear()
                sessionStorage.clear()
                resolve()
            })
        },
    },
    presist: {
        enable: true,
        resetToState: true,
        option: {
            exclude: ['username'],
        },
    },
})

export default useUserStore

/**
 * 返回一个Promise对象，目的是防止在非vue组件使用中的时候出现插件还没有出初始化完成导致持久化操作失败的bug。
 * 使用方式：
 *  import { useUserStoreContext } from '@/store/modules/user'
    useUserStoreContext().then((store) => {
      console.log(store.nickName)
    })
 * @returns Promise<typeof useUserStore>
 */
export async function useUserStoreContext() {
    await nextTick()
    return useUserStore(store)
}
