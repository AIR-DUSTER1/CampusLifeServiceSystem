import { defineStore } from 'pinia'
import type { UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/images/logo.png'
import { nextTick } from 'vue'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
    state: () => {
        return {
            id: 0,
            number: 0,
            auth: 0,
            token: '',
            username: '',
            nickname: '',
            avatar: defaultAvatar,
        }
    },
    actions: {
        saveUser(userInfo: UserState) {
            this.id = userInfo.id
            this.number = userInfo.number
            this.auth = userInfo.auth
            this.token = userInfo.token
            this.username = userInfo.username
            this.nickname = userInfo.nickname
            this.avatar = userInfo.avatar || defaultAvatar
        },
        getUserInfo() {
            return {
                id: this.id,
                number: this.number,
                auth: this.auth,
                token: this.token,
                username: this.username,
                nickname: this.nickname,
                avatar: this.avatar,
            }
        },
        isTokenExpire() {
            return !this.token
        },
        changeNickName(newnickname: string) {
            this.nickname = newnickname
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
