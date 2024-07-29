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
            role: 0,
            age: '0',
            sex: '男',
            username: '123',
            avatar: defaultAvatar,
            mail: '123',
            phone: '000',
            department: '信息技术部',
            token: '',
            // 用户名、头像、邮箱、手机号、年龄、角色、部门
        }
    },
    getters: {
        userinfo: (state) => {
            return {
                username: state.username,
                age: state.age,
                avatar: state.avatar,
                role: state.role,
                sex: state.sex,
                mail: state.mail,
                phone: state.phone,
                department: state.department,
            }
        }
    },
    actions: {
        saveUser(userinfo: UserState) {
            this.id = userinfo.id || this.id
            this.role = userinfo.role || this.role
            this.token = userinfo.token || this.token
            this.username = userinfo.username || this.username
            this.avatar = userinfo.avatar || defaultAvatar
            this.age = userinfo.age || this.age
            this.mail = userinfo.mail || this.mail
            this.phone = userinfo.phone || this.phone
            this.department = userinfo.department || this.department
        },
        UploadAvatar(avatar: string) {
            this.avatar = avatar
        },
        getUserInfo() {
            return {
                id: this.id,
                role: this.role,
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
