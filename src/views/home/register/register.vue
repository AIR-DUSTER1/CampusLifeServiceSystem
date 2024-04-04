<template>
    <div class="form-register">
        <div class="title">账号注册</div>
        <div class="item-wrapper">
            <a-input v-model="username" placeholder="请输入用户名" allow-clear size="large">
                <template #prefix>
                    <icon-mobile />
                </template>
            </a-input>
        </div>
        <div class="item-wrapper">
            <passwordstrong>
            </passwordstrong>
        </div>
        <div class="item-code">
            <a-input v-model="email" v-if="!email" placeholder="请输入邮箱" allow-clear size="large">
            </a-input>
            <a-input v-model="verificationCode" v-else placeholder="请输入邮箱验证码" allow-clear size="large">
            </a-input>
            <div class="code-btn">
                <a-button :disabled="updateDisableFlag" :long="true" ref="sendmail" @click="sendemail" type="primary"
                    size="large">
                    <span v-if="updateDisableFlag">{{ settimer }}</span>
                    <span v-else>发送验证码</span>
                </a-button>
            </div>
        </div>
        <div class="sendmailmessage" v-if="sendmailmessage">验证码已发送，5分钟内输入有效</div>
        <div :md="10">
            <a-button type="primary" class="register-btn" :loading="loading" @click="onregister">
                注册
            </a-button>
        </div>
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/home/login')" type="primary">登录</a-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import passwordstrong from '@/components/home/passwordstrong.vue'
import { Message } from '@arco-design/web-vue';
import { post } from '@/api/api';
const router = useRouter()
const route = useRoute()
let username = ref()
let password = ref()
let verificationCode = ref()
let loading = ref(false)
let sendmail = ref()
let updateDisableFlag = ref<boolean>(false)
let sendmailmessage = ref<boolean>(false)
let settimer = ref(120)
let email: string
function sendemail() {
    updateDisableFlag.value = true
    sendmailmessage.value = true
    let timer = setInterval(function () {
        settimer.value--;
        if (settimer.value == 0) {
            clearInterval(timer)
            updateDisableFlag.value = false
            sendmailmessage.value = false
            settimer.value = 120
        }
    }, 1000)
    post("/captcha/email", {
        email: email
    }).then((res) => {
        console.log(res);
    })
}
function onregister() {
    loading.value = true
    if (username.value == "") {
        Message.error("用户名不能为空")
        loading.value = false
    } else if (verificationCode.value == undefined) {
        Message.error("请输入验证码")
        loading.value = false
    } else if (verificationCode.value.length != 6) {
        Message.error("验证码长度必须为4位")
        loading.value = false
    } else if (username.value != "" && verificationCode.value.length == 6) {

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