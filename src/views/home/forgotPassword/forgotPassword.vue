<template>
    <div class="form-forgot-password">
        <div class="title">重置密码</div>
        <div class="item-code">
            <a-input v-model="email" v-if="!valid" placeholder="请输入邮箱" allow-clear size="large">
            </a-input>
            <a-input v-model="verificationCode" v-else placeholder="请输入邮箱验证码" allow-clear size="large">
            </a-input>
            <div class="code-btn">
                <a-button :disabled="valid" :long="true" ref="sendmail" @click="sendemail" type="primary" size="large">
                    <span v-if="valid">{{ settimer }}</span>
                    <span v-else>发送验证码</span>
                </a-button>
            </div>
        </div>
        <div class="sendmailmessage" v-if="valid">验证码已发送，5分钟内输入有效</div>
        <div class="item-wrapper" v-if="valid">
            <a-input v-model="password" placeholder="请输入密码" allow-clear size="large">
                <template #prefix>
                    <icon-lock />
                </template>
            </a-input>
        </div>
        <div v-if="valid">
            <a-button type="primary" class="login" :loading="loading" @click="onreset">
                确认提交
            </a-button>
        </div>
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/home/login')" type="primary">登录</a-link>
            <a-link :underline="false" @click="router.replace('/home/register')" type="primary">注册</a-link>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { post, put } from '@/api/api';
import { Message } from '@arco-design/web-vue';
const password = ref()
const router = useRouter()
let sendmailmessage = ref<boolean>(false)
let settimer = ref(120)
let verificationCode = ref()
let email: string
let loading = ref<boolean>(false)
let valid = ref(false)

function sendemail() {
    sendmailmessage.value = true
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    valid.value = pattern.test(email)
    console.log(valid.value);
    if (email == undefined) {
        Message.error("邮箱不能为空")
    } else if (!valid.value && email != undefined) {
        Message.error("请输入正确的邮箱格式")
    } else if (valid.value) {
        let timer = setInterval(function () {
            settimer.value--;
            if (settimer.value == 0) {
                clearInterval(timer)
                sendmailmessage.value = false
                settimer.value = 120
            }
        }, 1000)
        post("/captcha/email", {
            email: email
        }).then((res) => {
            Message.success("验证码发送成功")
            console.log(res);
        })
    }
}
function onreset() {
    loading.value = true
    if (password.value == undefined) {
        Message.error("密码不能为空")
        loading.value = false
    } else if (password.value.length < 6) {
        Message.error("密码长度不能小于6位")
        loading.value = false
    } else if (verificationCode.value == undefined) {
        Message.error("验证码不能为空")
        loading.value = false
    } else if (verificationCode.value.length < 6) {
        Message.error("验证码长度不能小于6位")
        loading.value = false
    } else if (password.value.length >= 6 && verificationCode.value.length == 6) {
        put("/user/recover", {
            email: email,
            password: password.value,
            verificationCode: verificationCode.value
        })
            .then((res) => {
                Message.success("密码重置成功")
                router.replace('/home/login')
                loading.value = false
            })
            .catch((err) => {
                Message.error(err.message)
                loading.value = false
            })
        loading.value = false
    }

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
