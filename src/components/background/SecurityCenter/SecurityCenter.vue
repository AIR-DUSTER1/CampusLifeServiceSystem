<template>
    <div class="security-center">
        <div class="back">
            <a-link @click="() => { modules = 0 }">
                返回
            </a-link>
        </div>
        <div>
            <a-typography-title :heading="3" style="margin: 0">
                {{ title }}
            </a-typography-title>
            <div v-if="modules == 4">
                <a-card hoverable :style="{ margin: '20px 0', minWidth: '300px' }" @click="toPhone()">
                    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }">
                        <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                            <icon-mobile />
                            <a-typography-text>手机验证</a-typography-text>
                        </span>
                        <icon-right />
                    </div>
                </a-card>
                <a-card hoverable :style="{ marginBottom: '20px', minWidth: '300px' }" @click="toEmail()">
                    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }">
                        <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                            <icon-email />
                            <a-typography-text>邮箱验证</a-typography-text>
                        </span>
                        <icon-right />
                    </div>
                </a-card>
            </div>
            <div v-if="modules == 5" class="verification">
                <div v-if="verification" style="width: 18.75rem;">为了您的账号安全，需要验证您的邮箱。验证码将通过邮件形式发送至：{{ email ?
                email.replace(/^(.{3}).*(.{9})$/, "$1****$2") : "" }}</div>
                <div v-else style="width: 18.75rem;">为了您的账号安全，需要验证您的手机号码。验证码将通过短信形式发送至：{{ phone ?
                phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") : "" }}</div>
                <a-verification-code v-model="verificationCode" class="verification-code" @finish="onFinish" />
                <div class="codebtn">
                    <a-link @click="deGetVerificationCode" :disabled="disabled">{{ verificationMessage }}</a-link>
                    <a-link v-if="verification" @click="deMobileAuthentication">手机验证</a-link>
                    <a-link v-else @click="deEmailAuthentication">邮箱验证</a-link>
                </div>
                <a-button type="primary" style="width: 100%;" @click="next()">下一步</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/stores/modules/user'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
import { get, post } from '@/api/api'
import { useDebounceFn } from '@vueuse/core'
const userStore = useUserStore()
let userInfo = computed(() => userStore.userinfo)
let modules = defineModel('modules')
let checkitem = defineModel('checkitem')
let disabled = ref(false)
let phone = computed(() => userStore.userinfo.phone)
let email = computed(() => userStore.userinfo.email)
let verification = ref()
let title = ref('安全中心')
let verificationMessage = ref('获取验证码')
let verificationCode = ref()
const deEmailAuthentication = useDebounceFn(emailAuthentication, 50)
const deMobileAuthentication = useDebounceFn(mobileAuthentication, 50)
const deGetVerificationCode = useDebounceFn(getVerificationCode, 50)
let key: string
let success: boolean
function onFinish(value: string) {
    post(
        '/captcha/check',
        { captcha: value, key: key },
        { Authorization: 'Bearer ' + userInfo.value.access_token }
    ).then((res: any) => {
        success = res.success
        if (success) {
            Message.success('验证成功');
        } else {
            Message.error(res.message);
        }
    }).catch(err => {
        Message.error(err.message);
    })
}
function getVerificationCode() {
    let time = 60
    disabled.value = true
    verificationMessage.value = time + 's后重新获取'
    let timer = setInterval(() => {
        if (time == 0) {
            clearInterval(timer)
            disabled.value = false
            verificationMessage.value = '重新发送'
        } else {
            time--
            verificationMessage.value = time + 's后重新获取'
        }
    }, 1000)
    if (verification.value) {
        get(
            '/captcha/phone',
            { Authorization: 'Bearer ' + userInfo.value.access_token },
            { phone: phone.value }
        ).then((res: any) => {
            success = res.success
            if (success) {
                key = res.data.key
                Message.success('验证码已发送');
            } else {
                Message.error(res.message);
            }
        })
    } else {
        get(
            '/captcha/email',
            { Authorization: 'Bearer ' + userInfo.value.access_token },
            { email: email.value }
        ).then((res: any) => {
            success = res.success
            if (success) {
                key = res.data.key
                Message.success('验证码已发送');
            } else {
                Message.error(res.message);
            }
        })
    }
}
function next() {
    if (success && checkitem.value == '修改密码') {
        modules.value = 1
    } else if (success && checkitem.value == '修改手机号') {
        modules.value = 2
    } else if (success && checkitem.value == '修改邮箱') {
        modules.value = 3
    } else {
        Message.error('请先认证成功')
    }
}
function toEmail() {
    if (email.value == '' || email.value == null || email.value == undefined) {
        Message.error('请先绑定邮箱')
    } else {
        modules.value = 5
        verification.value = true
        title.value = '邮箱验证'
    }
}
function toPhone() {
    if (phone.value == '' || phone.value == null || phone.value == undefined) {
        Message.error('请先绑定手机号')
    } else {
        modules.value = 5
        verification.value = false
        title.value = '手机验证'
    }
}
function mobileAuthentication() {
    modules.value = 5
    verification.value = false
    title.value = '邮箱验证'
}
function emailAuthentication() {
    modules.value = 5
    verification.value = true
    title.value = '手机验证'
}
</script>

<style lang='scss' scoped>
.security-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .back {
        width: 100%;
    }

    .verification {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;

        div {
            margin: .625rem 0;
        }

        .verification-code {
            width: 14.375rem;
        }

        .codebtn {
            width: 100%;
            display: flex;
            justify-content: space-between
        }
    }

}
</style>
