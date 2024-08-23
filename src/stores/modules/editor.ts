import { defineStore } from 'pinia'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            hasRegistered: false
        }
    },
    getters: {
        Registered: (state) => {
            return state.hasRegistered
        }
    },
    actions: {
        setRegisterer(register: boolean) {
            this.hasRegistered = register
        }
    }
})
export default useEditorStore