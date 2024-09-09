<template>
    <div>
        <a-collapse destroy-on-hide accordion>
            <template v-for="item in menuList">
                <a-collapse-item v-if="item.children && item.children.length > 0" class="menu-list" :key="item.mid">
                    <template #header>
                        <div>
                            <div v-if="item.icon">
                                <component :is="item.icon" />
                            </div>
                            <div>
                                {{ item.name }}
                            </div>
                        </div>
                    </template>
                    <template #extra>
                        <a-button type="primary" size="small" @click.stop="modify(item)">编辑</a-button>
                    </template>
                    <a-list class="menu-list-child" hoverable>
                        <template v-for="child in item.children" :key="child.mid">
                            <a-list-item>
                                <a-list-item-meta>
                                    <template #avatar>
                                        <div v-if="child.icon">
                                            <component :is="child.icon" />
                                        </div>
                                    </template>
                                    <template #title>
                                        {{ child.name }}
                                    </template>
                                </a-list-item-meta>
                                <template #actions>
                                    <a-button type="primary" size="small" @click="modify(child)">编辑</a-button>
                                </template>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-collapse-item>
                <a-list class="menu-item" v-if="item.children?.length == 0" hoverable :key="item.mid">
                    <a-list-item>
                        <a-list-item-meta>
                            <template #avatar>
                                <div v-if="item.icon">
                                    <component :is="item.icon" />
                                </div>
                            </template>
                            <template #title>
                                {{ item.name }}
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <a-button type="primary" size="small" @click="modify(item)">编辑</a-button>
                        </template>
                    </a-list-item>
                </a-list>
            </template>
        </a-collapse>
        <a-modal v-model:visible="visible" width="45vw" @ok="ok" @cancel="handleCancel">
            <template #title>
                {{ title }}
            </template>
            <div>
                <a-form :model="modifyMenu">
                    <a-form-item field="name" label="路由名称：">
                        <a-input v-model="modifyMenu.name" placeholder="请输入路由名称" />
                    </a-form-item>
                    <a-form-item field="path" label="路由地址：">
                        <a-input disabled v-model="modifyMenu.path" placeholder="请输入路由地址" />
                    </a-form-item>
                    <a-form-item field="icon" label="路由图标：" class="icon-select">
                        <a-select v-model="modifyMenu.icon" :options="icons" :loading="loading" placeholder="请选择图标"
                            @search="handleSearch" allow-search :filter-option="false"
                            :trigger-props="{ updateAtScroll: true }" @change="change" :field-names="{
                value: 'name',
                label: 'name'
            }" :virtual-list-props="{ height: 240, fixedSize: true }">
                            <template #option="{ data }">
                                <a-list class="list-icon">
                                    <a-list-item>
                                        <div style="display: flex;flex-direction: column;align-items: center">
                                            <component :is="data.name" :size="32" />
                                            <span
                                                style="width: 8.125rem;text-align: center;overflow: hidden;text-emphasis: none;white-space: nowrap;text-overflow: ellipsis;">
                                                {{ data.name }}
                                            </span>
                                        </div>
                                    </a-list-item>
                                </a-list>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import { Message } from '@arco-design/web-vue'
import { ref, reactive, computed, onMounted, toRaw } from 'vue'
import useUserStore from '@/stores/modules/user'
import useMenuStore from '@/stores/modules/menu'
import { get, put } from '@/api/api'
import type { menu } from '@/stores/types'
import { useDebounceFn } from '@vueuse/core'
const menuStore = useMenuStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userinfo)
const menuList = computed(() => menuStore.menu)
let modifyMenu = reactive({
    name: '',
    path: '',
    icon: '',
})
let mid = ref()
let visible = ref()
let title = ref()
let loading = ref()
let options = ref(['icon-arrow-down', 'icon-user-add', 'icon-woman',])
let icons = ref()
let ok = useDebounceFn(handleOk, 50)
let desearch = useDebounceFn(search, 100)
onMounted(() => {
    getIcon()
})
function modify(item: menu) {
    if (item.name != '' || item.name != undefined || item.name != null) {
        visible.value = true
        title.value = item.name
        mid.value = item.mid
        modifyMenu.name = item.name
        modifyMenu.path = item.path
        modifyMenu.icon = item.icon
    } else {
        Message.error('修改对象不能为空')
    }
}
function handleOk() {
    if (mid.value != '') {
        put(`/user/menu/${mid.value}`,
            { menu: toRaw(modifyMenu) },
            {
                'Authorization': 'Bearer ' + userInfo.value.access_token
            }
        ).then(res => {
            if (res.success) {
                Message.success('修改成功')
                visible.value = false
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else {
        Message.error('出错了')
    }
}
function handleCancel() {
    visible.value = false
}
function handleSearch(value: string) {
    loading.value = true
    if (value) {
        options.value = icons.value
        desearch(value)
    } else {
        icons.value = options.value
        loading.value = false
    }
}
function getIcon() {
    get(
        '/system/icon/list',
        { 'Authorization': 'Bearer ' + userInfo.value.access_token }
    ).then((res: any) => {
        if (res.success) {
            icons.value = res.data
        } else {
            Message.error(res.message)
        }
    }).catch((err) => {
        Message.error(err)
    })
}
function change(value: any) {
    console.log(value);

}
function search(value: string) {
    get(
        '/system/icon/search',
        { 'Authorization': 'Bearer ' + userInfo.value.access_token },
        { keyword: value }
    ).then((res: any) => {
        if (res.success) {
            icons.value = res.data
            loading.value = false
        } else {
            Message.error(res.message)
            loading.value = false
        }
    }).catch((err) => {
        Message.error(err)
        loading.value = false
    }
    )
}
</script>

<style lang='scss' scoped>
.menu-list {
    :deep(.arco-collapse-item-content) {
        padding: 0;
    }

    :deep(.arco-collapse-item-content-box) {
        padding: 0;
    }

    :deep(.arco-list-item) {
        background: white;
    }
}

.menu-item {
    :deep(.arco-list-item) {
        padding: .5rem .75rem .5rem 1.0625rem !important;
    }
}

.menu-item {
    :deep(.arco-list) {
        border-radius: 0;
        border-bottom: 1px solid rgb(229, 230, 235);
    }
}

.icon-select {
    :deep(.arco-select-view-value) {
        justify-content: flex-start;
    }

    :deep(.arco-select-dropdown-list) {
        display: grid;
    }
}

:global(.arco-select-dropdown-list) {}

:global(.arco-select-option) {
    width: 9.0625rem;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
    color: var(--color-text-1);
    font-size: 14px;
    line-height: 36px;
    text-align: left;
    background-color: var(--color-bg-popup);
    cursor: pointer;
    justify-content: center;
}

.list-icon :deep(.arco-list-item) {
    width: 9.0625rem;
    padding: .375rem .375rem !important;
}

:global(.arco-virtual-list>div>div) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
}
</style>
