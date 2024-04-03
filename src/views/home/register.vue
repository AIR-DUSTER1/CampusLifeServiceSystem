<template>
    <div class="form-register">
        <div class="title">账号注册</div>
        <div class="item-wrapper" :md="6">
            <a-input v-model="username" placeholder="请输入用户名" allow-clear size="large">
                <template #prefix>
                    <icon-mobile />
                </template>
            </a-input>
        </div>
        <div class="item-wrapper" :md="4">
            <passwordstrong>

            </passwordstrong>
        </div>
        <div class="item-code" :md="4">
            <a-input v-model="verificationCode" placeholder="请输入邮箱验证码" allow-clear size="large">
            </a-input>
            <div class="code-btn"><a-button :disabled="updateDisableFlag" :long="true" ref="sendmail" @click="sendemail"
                    type="primary" size="large">
                    <span v-if="updateDisableFlag">{{ settimer }}</span>
                    <span v-else>发送验证码</span>
                </a-button>
            </div>
        </div>
        <div :md="10">
            <a-button type="primary" class="register-btn" :loading="loading" @click="onregister">
                注册
            </a-button>
        </div>
        <div class="my-width" :md="4" :lg="8">
            <a-link :underline="false" @click="router.push('/login')" type="primary">登录</a-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import passwordstrong from './passwordstrong.vue';
const router = useRouter()
const route = useRoute()
let username = ref()
let password = ref()
let verificationCode = ref()
let loading = ref(false)
let sendmail = ref()
let updateDisableFlag = ref<boolean>(false)
let settimer = ref(120)
function sendemail() {
    updateDisableFlag.value = true
    let timer = setInterval(function () {
        settimer.value--;
        if (settimer.value == 0) {
            clearInterval(timer)
            updateDisableFlag.value = false
            settimer.value = 120
        }
    }, 1000)
}
function onregister() {

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
        margin-bottom: 1.5625rem;

        .code-btn {
            width: 6rem;
        }
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