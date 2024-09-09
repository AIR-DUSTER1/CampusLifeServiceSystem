import { defineStore } from 'pinia'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            hasRegistered: false,
            modify: false,
        }
    },
    getters: {
        Registered: (state) => {
            return state.hasRegistered
        },
        Modify: (state) => {
            return state.modify
        },
    },
    actions: {
        setRegisterer(register: boolean) {
            this.hasRegistered = register
        },
        setModify(modify: boolean) {
            this.modify = modify
        },

    }
})
export default useEditorStore