import { defineStore } from 'pinia'
import type { UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/images/logo.png'
import { nextTick } from 'vue'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
    state: () => {
        return {
            number: 0,
            auth: 0,
            token: '',
            userName: '',
            nickName: '',
            avatar: defaultAvatar,
        }
    },
    actions: {
        saveUser(userInfo: UserState) {
            this.number = userInfo.number
            this.auth = userInfo.auth
            this.token = userInfo.token
            this.userName = userInfo.userName
            this.nickName = userInfo.nickName
            this.avatar = userInfo.avatar || defaultAvatar
        },
        getUserInfo() {
            return {
                number: this.number,
                auth: this.auth,
                token: this.token,
                userName: this.userName,
                nickName: this.nickName,
                avatar: this.avatar,
            }
        },
        isTokenExpire() {
            return !this.token
        },
        changeNickName(newNickName: string) {
            this.nickName = newNickName
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
            exclude: ['userName'],
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