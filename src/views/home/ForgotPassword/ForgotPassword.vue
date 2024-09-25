<template>
    <div class="form-forgot-password">
        <div class="title">重置密码</div>
        <div class="item-code">
            <a-input v-model="number" placeholder="请输入邮箱/手机号" allow-clear size="large">
            </a-input>
            <div class="code-btn">
                <a-button :disabled="time" :long="true" ref="sendmail" @click="deSend" type="primary" size="large">
                    <span v-if="time">{{ settimer }}</span>
                    <span v-else>发送验证码</span>
                </a-button>
            </div>
        </div>
        <div class="item-wrapper" v-if="valid">
            <a-input-password v-model="password" placeholder="请输入新密码" allow-clear size="large">
                <template #prefix>
                    <icon-lock />
                </template>
            </a-input-password>
        </div>
        <div v-if="valid" class="verification">
            <a-verification-code class="verification-code" v-model="verificationCode" @finish="onFinish" />
        </div>
        <div class="sendmailmessage" v-if="valid">验证码已发送，5分钟内输入有效</div>
        <div v-if="valid">
            <a-button type="primary" class="login" :loading="loading" @click="onreset">
                确认提交
            </a-button>
        </div>
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/login')" type="primary">登录</a-link>
            <a-link :underline="false" @click="router.replace('/active')" type="primary">激活</a-link>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { post, put, get } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
import { useDebounceFn, useEventListener } from '@vueuse/core'
const userStore = useUserStore()
const password = ref()
const router = useRouter()
let settimer = ref(120)
let verificationCode = ref()
let number = ref()
let loading = ref<boolean>(false)
let valid = ref(false)
let validEmail = ref(false)
let validPhone = ref(false)
let time = ref(false)
let userInfo = computed(() => userStore.userinfo)
let key = ref()
const deSend = useDebounceFn(sendcode, 50)
onMounted(() => {
    useEventListener(window, 'keydown', (e) => {
        if (e.key === 'Enter') {
            onreset()
        }
    }, { passive: true });
})
function sendcode() {
    const emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phonereg = /^1[3-9]\d{9}$/
    validEmail.value = emailreg.test(number.value)
    validPhone.value = phonereg.test(number.value)
    if (number.value == undefined || number.value == "" || number.value == null) {
        Message.error("邮箱/手机号不能为空")
    } else if (!validEmail.value && !validPhone.value) {
        Message.error("请输入正确的邮箱/手机格式")
    } else if (validEmail.value && validPhone.value == false) {
        get(
            "/captcha/email", {},
            {
                email: number.value
            },
        ).then((res: any) => {
            if (res.success) {
                key.value = res.data.key
                Message.success("验证码发送成功")
                setTime()
                console.log(res);
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    } else if (validPhone.value && validEmail.value == false) {

        get("/captcha/phone", {},
            { phone: number.value },
        ).then((res: any) => {
            if (res.success) {
                key.value = res.data.key
                Message.success("验证码发送成功")
                setTime()
                console.log(res);
            } else {
                Message.error(res.message)
            }
        }).catch(err => {
            Message.error(err.message)
        })
    }
}
function onreset() {
    loading.value = true
    if (number.value == undefined || number.value == "" || number.value == null) {
        Message.error("邮箱/手机号不能为空")
    } else if (verificationCode.value == undefined) {
        Message.error("验证码不能为空")
        loading.value = false
    } else if (verificationCode.value.length < 6) {
        Message.error("验证码长度不能小于6位")
        loading.value = false
    } else if (password.value == undefined) {
        Message.error("密码不能为空")
        loading.value = false
    } else if (password.value.length < 6) {
        Message.error("密码长度不能小于6位")
        loading.value = false
    } else if (password.value.length >= 6 && verificationCode.value.length == 6) {
        put("/user/resetPassword", {
            payload: number.value,
            password: password.value,
            code: verificationCode.value,
            key: key.value
        })
            .then((res) => {
                if (res.success) {
                    Message.success("密码重置成功")
                    router.replace('/login')
                    loading.value = false
                } else {
                    loading.value = false
                    Message.error(res.message)
                }
            })
            .catch((err) => {
                Message.error(err.message)
                loading.value = false
            })
    }

}
function onFinish() {

}
function setTime() {
    valid.value = true
    time.value = true
    let timer = setInterval(function () {
        settimer.value--;
        if (settimer.value == 0) {
            clearInterval(timer)
            time.value = false
            settimer.value = 120
        }
    }, 1000)
}
</script>

<style lang='scss' scoped>
.form-forgot-password {
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
        margin: 1.5625rem 0;
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

    .verification {
        width: 100%;
        display: flex;
        justify-content: center;
        // margin-top: 0.625rem;

        .verification-code {
            width: 65%;
        }
    }

    .sendmailmessage {
        margin: 0.625rem 0;
        text-align: center;
    }

    .login {
        width: 100%;
        margin-bottom: 25px;
    }

    .my-width {
        display: flex;
        justify-content: space-between;
    }
}

@media screen and (max-width: 1024px) {
    .arco-input.arco-input-size-large {
        font-size: 32px !important;
    }
}

@media screen and (max-width: 768px) {
    .form-forgot-password {
        width: 100% !important;

        .third-party {
            margin-top: 20px;
        }
    }

}
</style>
