<template>
  <div class="form-login">
    <div class="title">账号登录</div>
    <div class="item-wrapper">
      <a-input v-model="number" placeholder="请输入学号/邮箱" allow-clear size="large">
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
      <div class="code-img" ref="codeimg">
        <img :src="imagecode" class="image" @click="obtainVerificationCode" alt="网络失联了">
      </div>
    </div>
    <div>
      <a-button type="primary" class="login" :loading="loading" @click="onLogin">
        登录
      </a-button>
    </div>
    <div class="autologin">
      <a-checkbox v-model="autoLogin">
        记住密码
      </a-checkbox>
    </div>
    <div class="my-width">
      <a-link :underline="false" @click="router.replace('/home/register')" type="primary">注册</a-link>
      <a-link :underline="false" @click="router.replace('/home/forgotpassword')" type="primary">忘记密码?</a-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onUpdated, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { post, get } from '@/api/api'
import { Message, type MessageConfig } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
import { useStorage, useWindowSize, useSessionStorage } from '@vueuse/core'

const { width } = useWindowSize()// 获取屏幕宽高
let number = ref<string>()// 学号
let password = ref<string>()// 密码
let verificationCode = ref<string>()// 验证码
let autoLogin = ref(true)// 是否自动登录
let loading = ref(false)// 登录加载
const router = useRouter()// 获取路由
const route = useRoute()// 获取路由信息
const userStore = useUserStore()// 获取用户信息
let imagecode = ref()// 图片验证码地址
let codeimg = ref()// 图片验证码容器
let loginkey: string// 验证码key

onBeforeMount(() => {
  obtainVerificationCode()// 获取验证码
})
onMounted(() => {
  routerto()
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
  } else if (password.value!.length < 6) {
    Message.error("密码长度不能小于6位")
    loading.value = false
  } else if (verificationCode.value == undefined) {
    Message.error("请输入验证码")
    loading.value = false
  } else if (verificationCode.value.length != 4) {
    Message.error("验证码长度必须为4位")
    loading.value = false
  }
  else if (number.value != "" && password.value!.length >= 6 && verificationCode.value.length == 4) {
    post(
      "/user/login",
      {
        number: number.value,
        password: password.value,
        captcha: verificationCode.value
      },
      { headers: { "Captcha-Key": loginkey } }
    )
      .then((res: any) => {
        // 后端校验有错重新获取验证码
        if (res.message != null) {
          obtainVerificationCode()
          Message.error(res.message)
          loading.value = false
          // 请求无误
        } else if (res.message == null) {
          userStore.saveUser(res.data)// 保存用户信息
          const token = useStorage("token", res.data.token)// 用户token保存到浏览器中的localstorage
          const session = useSessionStorage("token", res.data.token)// 用户token到浏览器中的session里
          routerto()
        } else {
          Message.error("未知错误")
        }
      })
      .catch((error) => {
        Message.error(error.message)
        loading.value = false
      })
  } else {
    Message.error("未知错误")
    loading.value = false
  }
}
function routerto() {
  let userinfo = userStore.getUserInfo()
  // 校验登录用户是否为有权限访问后端
  if (userinfo.role && userinfo.role == 2 || userinfo.role == 3) {
    router
      .replace({
        path: "/background",
      })
      .then(() => {
        Message.success('登录成功!')
      })
  }
  // 校验登录用户为普通用户
  else if (userinfo.role && userinfo.role == 1) {
    router
      .replace({
        path: "/foreground",
      })
      .then(() => {
        Message.success('登录成功!')
      })
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
      text-align: center;

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