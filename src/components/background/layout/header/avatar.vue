<template>
    <div class="vaw-avatar-container">
        <a-dropdown trigger="hover" size="large" :select="handleSelect">
            <div class="action-wrapper">
                <div class="avatar">
                    <a-avatar :size="30">
                        <img :src="userStore.avatar" />
                    </a-avatar>
                </div>
                <span class="username">
                    {{ userStore.username }}
                </span>
                <icon-caret-down class="tip" />
            </div>
            <template #content>
                <a-doption v-for="item of options" :key="item.key" @click="handleSelect(item.key)" :value="item.key">
                    <template #icon>
                        <component :is="item.icon" />
                    </template>
                    {{ item.label }}
                </a-doption>
            </template>
        </a-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { Message, Modal } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { get, post } from '@/api/api';
const userStore = useUserStore()
const userinfo = userStore.getUserInfo()

onMounted(() => {
    get(`/user/simple/${userinfo.id}`,
        {
            token: userinfo.token
        },
    ).then((res: any) => {
        userStore.saveUser(res.data.id, res.data.number, res.data.avatar, res.data.username)
    })
        .catch((error) => {
            Message.error(error.message)
        })
})
const options = [
    {
        label: '个人中心',
        key: 'personal-center',
        icon: 'icon-user',
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: 'icon-poweroff',
    },
    {
        label: "切换前台",
        key: "switch",
        icon: "icon-swap"
    }
]

const router = useRouter()
function personalCenter() {
    router.push('/background/info')
}
function switchpage() {
    router.push('/foreground')
}
function logout() {
    Modal.confirm({
        title: '提示',
        content: '是否要退出当前账号？',
        okText: '退出',
        cancelText: '再想想',
        onOk: () => {
            post(
                "/user/logout",
                {},
                { headers: { "token": userinfo.token } }
            )
            userStore.logout().then(() => {
                router.push('/')
            })
        },
    })
}
function handleSelect(key: string) {
    console.log(key)
    switch (key) {
        case 'personal-center':
            personalCenter()
            break
        case 'logout':
            logout()
            break
        case 'switch':
            switchpage()
            break
    }
}
</script>

<style lang="scss" scoped>
.vaw-avatar-container {
    .action-wrapper {
        display: flex;
        align-items: center;

        .avatar {
            display: flex;
            align-items: center;

            &>img {
                border: 1px solid #f6f6f6;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        .username {
            margin: 0 5px;

            .tip {
                transform: rotate(0);
                transition: transform 0.3s ease;
                margin-left: 2px;
            }
        }
    }
}

.vaw-avatar-container:hover {
    cursor: pointer;
    color: var(--primary-color);

    .tip {
        transform: rotate(180deg);
        transition: transform 0.3s ease;
    }
}
</style>