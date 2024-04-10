<template>
    <div class="form-register">
        <div class="title">账号注册</div>
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
        <div :md="10">
            <a-button type="primary" class="register-btn" :loading="loading" @click="onregister">
                注册
            </a-button>
        </div>
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/home/login')" type="primary">登录</a-link>
            <a-link :underline="false" @click="router.replace('/home/forgotpassword')" type="primary">忘记密码?</a-link>
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
let email: string
let valid = ref(false)
let emailkey = shallowRef<string>()
function sendemail() {
    sendmailmessage.value = true
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    valid.value = pattern.test(email)
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
        }).then((res: any) => {
            if (res.message == null) {
                Message.success("验证码发送成功")
                emailkey = res.data
            } else if (res.message != null) {
                Message.error(res.message)
            } else {
                Message.error("未知错误")
            }
            console.log(res);
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
    } else if (number.value != "" && password.value == repassword.value && verificationCode.value.length == 6) {
        post(
            "/user/active",
            {
                number: number.value,
                password: password.value,
                email: email,
                captcha: verificationCode.value
            },
            { headers: { "Captcha-Key": emailkey } }
        ).then((res: any) => {
            if (res.message == null) {
                Message.success("注册成功")
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