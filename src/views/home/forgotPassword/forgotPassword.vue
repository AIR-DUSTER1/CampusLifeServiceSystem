<template>
    <div class="form-forgot-password">
        <div class="title">账号登录</div>
        <div class="item-wrapper">
            <a-input v-model="number" placeholder="请输入用户名/邮箱" allow-clear size="large">
                <template #prefix>
                    <icon-mobile />
                </template>
            </a-input>
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
        <div class="my-width">
            <a-link :underline="false" @click="router.replace('/home/login')" type="primary">登录</a-link>
            <a-link :underline="false" @click="router.replace('/home/register')" type="primary">注册</a-link>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { post } from '@/api/api';
const number = ref()
const router = useRouter()
let updateDisableFlag = ref<boolean>(false)
let sendmailmessage = ref<boolean>(false)
let settimer = ref(120)
let verificationCode = ref()
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
    // post("/captcha/email", {
    //     email: email
    // }).then((res) => {
    //     console.log(res);
    // })
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

    .my-width {
        display: flex;
        justify-content: space-between;
    }
}
</style>
