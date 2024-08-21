<template>
    <div>
        <a-collapse destroy-on-hide accordion>
            <template v-for="item in menuList">
                <a-collapse-item v-if="item.children && item.children.length > 0" class="menu-list" :key="item.mid">
                    <template #header>
                        <div>
                            <div>
                                <!-- <component :is="item.icon" /> -->
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
                                        <!-- <component :is="child.icon" /> -->
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
                                <!-- <component :is="item.icon" /> -->
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
                        <a-select v-model="modifyMenu.icon" :loading="loading" placeholder="请选择图标"
                            @search="handleSearch" allow-search :filter-option="false">
                            <template #option>
                                <component :is="modifyMenu.icon" />
                            </template>
                            <!-- <a-option v-for="item of options" :value="item">
                                {{ item }}
                            </a-option> -->
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
let options = ref(['icon-apps'])
let ok = useDebounceFn(handleOk, 50)
onMounted(() => {

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
    console.log(value);

    if (value) {
        loading.value = true;
        window.setTimeout(() => {
            options.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`]
            loading.value = false;
        }, 2000)
    } else {
        options.value = []
    }
};
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
}
</style>
