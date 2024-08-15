import { defineStore } from 'pinia'
import type { UserState, decoded } from '../types'
import store from '../pinia'
import Avatar from '@/assets/images/logo.png'
import { nextTick } from 'vue'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
    state: () => {
        return {
            uid: 0,
            number: '',
            sex: '',
            username: '',
            avatar: defaultAvatar,
            email: '',
            phone: '',
            department: '',
            idNumber: '',
            access_token: '',
            authorities: ['']
            // 用户名、头像、邮箱、手机号、年龄、角色、部门
        }
    },
    getters: {
        userinfo: (state) => {
            return {
                uid: state.uid,
                number: state.number,
                username: state.username,
                avatar: state.avatar,
                sex: state.sex,
                email: state.email,
                phone: state.phone,
                department: state.department,
                authorities: state.authorities,
                access_token: state.access_token,
                idNumber: state.idNumber,
            }
        }
    },
    actions: {
        saveUser(userinfo: UserState) {
            this.uid = userinfo.id || this.uid
            this.access_token = userinfo.access_token || this.access_token
            this.number = userinfo.number || this.number
            this.username = userinfo.username || this.username
            this.sex = userinfo.sex || this.sex
            this.avatar = userinfo.avatar || defaultAvatar
            this.email = userinfo.email || this.email
            this.phone = userinfo.phone || this.phone
            this.department = userinfo.department || this.department
            this.idNumber = userinfo.idNumber || this.idNumber
        },
        saveToken(token: string, decode: decoded) {
            this.access_token = token
            this.username = decode.user_name
            this.authorities = decode.authorities
            this.uid = decode.uid
        },
        SaveSex(newsex: string) {
            this.sex = newsex
        },
        UploadAvatar(avatar: string) {
            this.avatar = avatar
        },
        getUserInfo() {
            return {
                uid: this.uid,
                token: this.access_token,
                username: this.username,
                avatar: this.avatar,
            }
        },
        /**
         * 判断令牌是否过期
         * 如果 access_token 不存在，则表示令牌已过期
         * @returns {boolean} - 如果令牌过期返回 true，否则返回 false
         */
        isTokenExpire() {
            return !this.access_token
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
