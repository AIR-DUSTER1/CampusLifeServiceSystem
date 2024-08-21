import { defineStore } from 'pinia'
import type { menu } from '@/stores/types'
const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menuList: [] as menu[]
        }
    },
    getters: {
        menu: (state) => {
            return state.menuList
        }
    },
    actions: {
        setMenuList(menuList: menu[]) {
            this.menuList = menuList
        }
    }
})
export default useMenuStore