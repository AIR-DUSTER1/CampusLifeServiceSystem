<template>
    <div class="form-register">
        <div class="title">账号激活</div>
        <div class="item-wrapper">
            <a-input v-model="number" placeholder="请输入学号" allow-clear size="large">
                <template #prefix>
                    <icon-mobile />
                </template>
            </a-input>
        </div>
        <div class="item-wrapper">
            <passwordstrong v-model:password="password" v-model:repassword="repassword">
            </passwordstrong>
        </div>
        <div class="item-code">
            <a-input v-model="contactInfo" v-if="!valid" placeholder="请输入邮箱或手机号" allow-clear size="large">
            </a-input>
            <a-input v-model="verificationCode" v-else placeholder="请输入验证码" allow-clear size="large">
            </a-input>
            <div class="code-btn">
                <a-button :disabled="valid" :long="true" ref="sendmail" @click="sendemail" type="primary" size="large">
                    <span v-if="valid">{{ settimer }}</span>
                    <span v-else>发送验证码</span>
                </a-button>
            </div>
        </div>
        <div class="sendmailmessage" v-if="valid">验证码已发送，5分钟内输入有效</div>
        <div :md="10">
            <a-button type="primary" class="register-btn" :loading="loading" @click="onregister">
                激活
            </a-button>
        </div>
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/login')" type="primary">登录</a-link>
            <a-link :underline="false" @click="router.replace('/forgotpassword')" type="primary">忘记密码?</a-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import passwordstrong from '@/components/home/passwordstrong.vue'
import { post } from '@/api/api';
import { Message } from '@arco-design/web-vue';
const router = useRouter()
const route = useRoute()
let number = ref<string>()
let password = ref<string>()
let repassword = ref<string>()
let verificationCode = ref()
let loading = ref<boolean>(false)
let sendmail = ref()
let sendmailmessage = ref<boolean>(false)
let settimer = ref(120)
let contactInfo = ref()
let valid = ref(false)
let emailkey = shallowRef<string>()
let phonekey = shallowRef<string>()
let email = shallowRef<boolean>()
let phone = shallowRef<boolean>()
function sendemail() {
    sendmailmessage.value = true
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneReg = /^1[3456789]\d{9}$/
    email.value = emailReg.test(contactInfo.value)
    phone.value = phoneReg.test(contactInfo.value)
    if (email.value || phone.value) {
        valid.value = true
    } else if (contactInfo.value == undefined || contactInfo.value == "" || contactInfo.value == null) {
        Message.error("手机号或邮箱不能为空")
    } else if (!valid.value) {
        Message.error("请输入正确的手机号或邮箱格式")
    } else if (valid.value && email.value) {
        post("/captcha/email", {
            email: contactInfo.value
        }).then((res: any) => {
            if (res.success) {
                Message.success("验证码发送成功")
                setTime()
                emailkey.value = res.data
            } else {
                Message.error(res.message)
            }
        }).catch((err: any) => {
            Message.error(err)
        })
    } else if (valid.value && phone.value) {
        post(
            '/captcha/phone',
            { phone: contactInfo.value }
        ).then((res: any) => {
            if (res.success) {
                Message.success("验证码发送成功")
                setTime()
                phonekey.value = res.data
            } else {
                Message.error(res.message)
            }
        }).catch((err) => {
            Message.error(err)
        })
    }
}
function onregister() {
    loading.value = true
    if (number.value == "") {
        Message.error("用户名不能为空")
        loading.value = false
    } else if (verificationCode.value == undefined) {
        Message.error("请输入验证码")
        loading.value = false
    } else if (password.value!.length < 6) {
        Message.error("密码不能小于6位")
        loading.value = false
    } else if (password.value == "" && repassword.value == "") {
        Message.error("密码不能为空")
        loading.value = false
    }
    else if (password.value != repassword.value) {
        Message.error("两次输入密码不一致")
        loading.value = false
    }
    else if (verificationCode.value.length != 6) {
        Message.error("验证码长度必须为6位")
        loading.value = false
    } else if (email.value) {
        post(
            "/user/active",
            {
                number: number.value,
                password: password.value,
                email: contactInfo.value,
                captcha: verificationCode.value
            },
            { headers: { "Captcha-Key": emailkey.value } }
        ).then((res: any) => {
            if (res.message == null) {
                Message.success("激活成功")
                router.replace('/home/login')
            } else if (res != null) {
                Message.error(res.message)
            } else {
                Message.error("未知错误")
            }
            loading.value = false
        }
        ).catch((error) => {
            Message.error(error.message)
        })
    } else if (phone.value) {
        post(
            "/user/active",
            {
                number: number.value,
                password: password.value,
                phone: contactInfo.value,
                captcha: verificationCode.value
            },
            { headers: { "Captcha-Key": emailkey.value } }
        ).then((res: any) => {
            if (res.message == null) {
                Message.success("激活成功")
                router.replace('/home/login')
            } else if (res != null) {
                Message.error(res.message)
            } else {
                Message.error("未知错误")
            }
            loading.value = false
        }
        ).catch((error) => {
            Message.error(error.message)
        })
    } else {
        Message.error("未知错误")
        loading.value = false
    }
}
function setTime() {
    let timer = setInterval(function () {
        settimer.value--;
        if (settimer.value == 0) {
            clearInterval(timer)
            sendmailmessage.value = false
            settimer.value = 120
        }
    }, 1000)
}
</script>
<style lang="scss" scoped>
.form-register {
    width: 50%;
    padding: 2% 5%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 1.5625rem;
        font-weight: bold;
        margin: 1.25rem 0;
        text-align: center;
    }

    .item-wrapper {
        margin-bottom: 1.5625rem;
    }

    .item-code {
        display: flex;
        flex-direction: row;
        margin-bottom: .625rem;

        .code-btn {
            width: 6rem;
            margin-left: 5px;
        }
    }

    .sendmailmessage {
        margin-bottom: 10px;
    }

    .my-width {
        display: flex;
        justify-content: space-between;
    }

    .register-btn {
        width: 100%;
        margin-bottom: 15px;
    }

    .third-party {
        margin-top: 40px;
    }
}

@media screen and (max-width: 1024px) {
    .arco-input.arco-input-size-large {
        font-size: 32px !important;
    }
}

@media screen and (max-width: 768px) {
    .form-register {
        width: 100% !important;

        .third-party {
            margin-top: 20px;
        }
    }

}
</style>