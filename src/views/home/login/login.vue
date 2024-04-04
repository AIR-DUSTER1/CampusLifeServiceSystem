<template>
  <div class="form-login">
    <div class="title">账号登录</div>
    <div class="item-wrapper">
      <a-input v-model="number" placeholder="请输入用户名/邮箱" allow-clear size="large">
        <template #prefix>
          <icon-mobile />
        </template>
      </a-input>
    </div>
    <div class="item-wrapper">
      <a-input-password v-model="password" placeholder="请输入密码" allow-clear size="large">
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </div>
    <div class="item-code">
      <a-input v-model="verificationCode" placeholder="请输入验证码" allow-clear size="large">
      </a-input>
      <div class="code-img" ref="codeimg" v-if="resultcode == true">
        <img :src="imagecode" class="image" @click="obtainVerificationCode" alt="">
      </div>
      <div class="code-img" ref="codeimg" v-else>
        <img src="" class="image" @click="obtainVerificationCode" alt="">
      </div>
    </div>
    <div>
      <a-button type="primary" class="login" :loading="loading" @click="onLogin">
        登录
      </a-button>
    </div>
    <div class="autologin">
      <a-checkbox v-model="autoLogin">
        自动登录
      </a-checkbox>
    </div>
    <div class="my-width">
      <a-link :underline="false" @click="router.replace('/home/register')" type="primary">注册</a-link>
      <a-link :underline="false" @click="router.replace('/home/forgotpassword')" type="primary">忘记密码?</a-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onUpdated, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { post, get } from '@/api/api'
import { Message, type MessageConfig } from '@arco-design/web-vue'
import type { UserState } from '@/stores/types'
import useUserStore from '@/stores/modules/user'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()// 获取屏幕宽高
let number = ref()
let password = ref()
let verificationCode = ref()
let autoLogin = ref(true)
let loading = ref(false)
const router = useRouter()// 获取路由
const route = useRoute()// 获取路由信息
const userStore = useUserStore()// 获取用户信息
let imagecode = ref()
let codeimg = ref()
let loginkey: string
let resultcode = ref(false)

onBeforeMount(() => {
  obtainVerificationCode()// 获取验证码
})
// 计算验证码宽度
function calculatewidth() {
  let codewidth = width.value / 3
  if (codewidth > 210) {
    codewidth = 210
    return codewidth;
  } else {
    return codewidth;
  }
}

// 更改验证码宽度
onUpdated(() => {
  codeimg.value.style.width = calculatewidth() + "px"
})
// 获取验证码
function obtainVerificationCode() {
  get("/captcha/image", {
    width: Math.round(calculatewidth()),
    height: 36
  },
  ).then((res: any) => {
    imagecode.value = res.data.image
    loginkey = res.data.key
    resultcode.value = true
  }).catch((e: any) => {
    Message.error(e.message)
  })
}
// 登录提交
const onLogin = async () => {
  loading.value = true //按钮请求状态
  // 表单验证
  if (number.value == "") {
    Message.error("用户名不能为空")
    loading.value = false

  } else if (password.value.length < 6) {
    Message.error("密码长度不能小于6位")
    loading.value = false

  } else if (verificationCode.value == undefined) {
    Message.error("请输入验证码")
    loading.value = false

  } else if (verificationCode.value.length != 4) {
    Message.error("验证码长度必须为4位")
    loading.value = false
  }
  else if (number.value != "" && password.value.length >= 6 && verificationCode.value.length == 4) {
    await post(
      "/user/login",
      {
        number: number.value,
        password: password.value,
        captcha: verificationCode.value
      },
      { headers: { "Captcha-Key": loginkey } }
    )
      .then((res: any) => {
        console.log(res.message);
        if (res.message != null) {
          Message.error(res.message)
        } else if (res.message == null) {
          userStore.saveUser(res as UserState).then(() => {
            router
              .replace({
                path: "/background",
              })
              .then(() => {
                Message.success('登录成功，欢迎：' + number.value)
                loading.value = false;
              })
          })
        } else {
          Message.error("未知错误")
        }
      })
      .catch((error: { message: string | MessageConfig }) => {
        Message.error(error.message)
        loading.value = false
      })
  } else {
    Message.error("未知错误")
    loading.value = false
  }
}
</script>
<style lang="scss" scoped>
// 登录组件样式
.form-login {
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

  .item-wrapper,
  .autologin {
    margin-bottom: 1.5625rem;
  }

  .item-code {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5625rem;

    .code-img {
      width: 5rem;

      .image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .my-width {
    display: flex;
    justify-content: space-between;
  }

  .login {
    width: 100%;
    margin-bottom: 25px;
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
  .form-login {
    width: 100% !important;

    .third-party {
      margin-top: 20px;
    }
  }

}
</style>