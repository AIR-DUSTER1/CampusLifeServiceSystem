<template>
    <div>
        <a-list v-if="modules == 0">
            <template #header>账户管理</template>
            <a-list-item v-for="item in list" :key="item.id">
                <a-list-item-meta>
                    <template #title>
                        {{ item.title }}
                    </template>
                    <template #description>
                        {{ item.description }}
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <a-button type="text" @click="modify(item)">修改</a-button>
                </template>
            </a-list-item>
        </a-list>
        <div v-else-if="modules == 1" class="password">
            <div style="width: 18.75rem;">
                <a-typography-title :heading="3" style="margin: 0">
                    {{ title }}
                </a-typography-title>
                <div style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    密码可由数字、大写英文字母、小写英文字母、特殊字符组成，至少包含两种类型，长度要求8-16位字符。</div>
                <div class="passwordform">
                    <passwordstrong v-model:password="form.password" v-model:repassword="form.repassword">
                    </passwordstrong>
                </div>
                <div class="passwordbtn">
                    <a-button class="btn" type="primary" @click="modifypassword">修改</a-button>
                </div>
            </div>
        </div>
        <div v-else-if="modules == 2 || modules == 3" class="code">
            <div class="back">
                <a-link @click="() => { modules = 0 }">
                    返回账户管理
                </a-link>
            </div>
            <div style="width: 18.75rem;">
                <a-typography-title :heading="3" style="margin: 0">
                    {{ title }}
                </a-typography-title>
                <div v-if="modules == 2 && !newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录手机号，请先输入新的手机号码。
                </div>
                <div v-if="modules == 2 && newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录手机号，需要完成手机号验证。验证码将发送至：+86 {{ form.phone }}
                </div>
                <div v-else-if="modules == 3 && !newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录邮箱，请先输入新的邮箱。
                </div>
                <div v-else-if="modules == 3 && newcode" style="margin-top: 15px;line-height: 1.5;font-size: 12px;">
                    当前你正在修改登录邮箱，需要完成邮箱验证。验证码将发送至：{{ form.email }}
                </div>
                <div class="codeform">
                    <a-input class="codeinput" v-model="form.phone" v-if="!newcode && modules == 2"
                        placeholder="请输入新手机号">
                        <template #prepend>
                            +86
                        </template>
                    </a-input>
                    <a-input class="codeinput" v-model="form.email" v-else-if="!newcode && modules == 3"
                        placeholder="请输入新邮箱"></a-input>
                    <a-verification-code v-if="newcode && modules == 2 || modules == 3" v-model="verificationCode"
                        class="verification-code" @finish="onFinish" />
                </div>
                <div class="codebtn">
                    <a-button class="btn" v-if="!newcode" @click="sendcode" type="primary">获取验证码</a-button>
                    <a-button class="btn" v-else @click="modifycode" type="primary">修改</a-button>
                </div>
            </div>
        </div>
        <div v-else>
            <securitycenter v-model:modules="modules" v-model:checkitem="checkitem"></securitycenter>
        </div>
        <Message ref="message" />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import passwordstrong from '@/components/home/passwordstrong.vue'
import securitycenter from '@/components/background/SecurityCenter/SecurityCenter.vue'
import Message from '@/components/background/message/message.vue'
const userStore = useUserStore()
let modules = ref(0)
const message = ref()
let title = ref()
let checkitem = ref()
let verificationCode = ref()
let newcode = ref(false)
let form = reactive({
    password: '',
    repassword: '',
    phone: '',
    email: ''
})
let list = reactive([
    {
        id: 0,
        title: '修改密码',
        description: ''
    },
    {
        id: 1,
        title: '修改手机号',
        description: userStore.phone ? userStore.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") : ""
    },
    {
        id: 2,
        title: '修改邮箱',
        description: userStore.mail ? userStore.mail.replace(/^(.{3}).*(.{9})$/, "$1****$2") : ""
    },
])
function modify(item: any) {

    if (item.title == '修改密码') {
        modules.value = 4
        checkitem.value = item.title
        title.value = item.title
    } else if (item.title == '修改手机号') {
        modules.value = 4
        checkitem.value = item.title
        title.value = '新手机号设置'
    } else if (item.title == '修改邮箱') {
        modules.value = 4
        checkitem.value = item.title
        title.value = '新邮箱设置'
    }
}
function sendcode() {
    newcode.value = true
    message.value.success('修改成功')
}
function onFinish() {
    console.log('验证码输入完成');
}
function modifypassword() {

}
function modifycode() {
    console.log('修改完成');
    message.value.success('修改成功')
}
</script>

<style lang='scss' scoped>
.password {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .passwordform {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 1.25rem 0;
        flex-direction: column;
    }

    .passwordbtn {
        display: flex;
        justify-content: center;

        .btn {
            width: 100%;
        }
    }

}

.code {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .back {
        width: 100%;
    }

    .codeform {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.875rem 0;

        .codeinput {
            max-width: 400px;
        }
    }

    .codebtn {
        display: flex;
        justify-content: center;

        .btn {
            width: 100%;
        }
    }
}
</style>
