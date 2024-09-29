<template>
    <a-layout has-sider class="background-layout">
        <a-layout-sider class="background-layout-sider" @collapse="onCollapse" breakpoint="xl" :collapsible="true">
            <transition name="logo">
                <Logo v-model="collapsed"></Logo>
            </transition>
            <Menu v-model:collapsed="collapsed" v-model:menuList="menuList" v-model:flag="flag"></Menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="background-layout-header">
                <Header></Header>
            </a-layout-header>
            <a-scrollbar type="embed" style="height: 87vh;width: 100%;overflow-y: auto;"
                outer-class="background-layout-content">
                <!-- <a-card class="content-card"> -->
                <div ref="content">
                    <RouterView v-slot="{ Component, route }">
                        <KeepAlive ref="keepAlive" :include="includes">
                            <component :is="Component" :key="route.path" />
                        </KeepAlive>
                    </RouterView>
                </div>
                <!-- </a-card> -->
                <Footer v-model:footerposition="footerposition" v-model:collapsed="collapsed"></Footer>
            </a-scrollbar>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import Header from "@/components/background/layout/header/header.vue"
import Menu from "@/components/common/menu.vue"
import Logo from "@/components/background/layout/menu/logo.vue"
import Footer from "@/components/background/layout/footer/footer.vue"
import { ref, shallowRef, onMounted, watch, reactive, computed } from "vue"
import { useElementSize, useStorage, useSessionStorage } from '@vueuse/core'
import { get } from "@/api/api"
import { Message } from "@arco-design/web-vue"
import useUserStore from '@/stores/modules/user'
import useMenuStore from '@/stores/modules/menu'
const menuStore = useMenuStore()
let userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let menuList = computed(() => menuStore.menu)
let includes = reactive<string[]>([])
const keepAlive = ref()
let changetab = ref()
let tab = useSessionStorage('currentRoute', [{
    key: 0,
    path: "/background/index",
    name: 'home',
    title: "首页"
}])
let margin = shallowRef()
let collapsed = ref()
let content = ref()
const { height } = useElementSize(content)
let footerposition = ref()
let flag = ref(false)
onMounted(() => {
    gettoken()
    getmargin()
    getmenu()
    tab.value.forEach((item: any) => {
        includes.push(item.name)
    })
})
watch(tab, (newtab, oldtab) => {
    if (oldtab.length > newtab.length) {
        changetab.value = oldtab.filter((item: any) => {
            return !newtab.some((item2: any) => item2.key === item.key)
        })
        if (changetab.value && changetab.value.length > 0) {
            let index = includes.indexOf(changetab.value[0].name)
            if (index != -1) {
                includes.splice(index, 1)
            }
        }
    } else if (oldtab.length < newtab.length) {
        changetab.value = newtab.filter((item: any) => {
            return !oldtab.some((item2: any) => item2.key === item.key)
        })
        if (changetab.value && changetab.value.length > 0) {
            let index = includes.indexOf(changetab.value[0].name)
            console.log(index);
            if (index == -1) {
                includes.push(changetab.value[0].name)
            }
        }
    }
})
watch(() => height.value, (value) => {
    if (value > 580) {
        footerposition.value = 'relative'
    } else {
        footerposition.value = 'fixed'
    }
})
function getmargin() {
    if (collapsed.value) {
        margin.value = 48 + 'px'
    } else {
        margin.value = 200 + 'px'
    }
}
function onCollapse(val: boolean, type: string) {
    collapsed.value = val
    getmargin()
    console.log(val, type)
}
async function getmenu() {
    await get(
        "/user/menu/tree",
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    )
        .then((res: any) => {
            menuStore.setMenuList(res.data)
            flag.value = true
        })
        .catch((err) => {
            Message.error(err.message)
        })
}
function gettoken() {
    let token = useStorage("access_token", localStorage.getItem('access_token'))
    // console.log(token.value);
}
</script>

<style lang="scss" scoped>
.background-layout {
    height: 100vh; // 确保布局占据整个视口高度
    display: flex;
    background-color: rgb(233, 240, 254);

    .background-layout-sider {
        position: fixed;
        height: 100vh;
        z-index: 2;
    }

    .background-layout-header {
        position: relative;
        margin-left: v-bind(margin);
        z-index: 1;
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
    }

    .background-layout-content {
        height: 85vh;
        max-height: 85vh;
        margin-left: v-bind(margin);
        transition: all 0.3s;
        margin-top: 3px;
        padding: 0 3px;
        z-index: 1;
        flex: none !important;

        :deep(.arco-card-body) {
            padding: 10px;
        }
    }
}
</style>
