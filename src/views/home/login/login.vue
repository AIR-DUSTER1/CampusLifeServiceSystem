<template>
  <div class="form-login">
    <div class="title">账号登录</div>
    <div class="item-wrapper">
      <a-input v-model="number" :placeholder="usernamePlaceholder" allow-clear size="large">
        <template #prefix>
          <icon-mobile />
        </template>
      </a-input>
    </div>
    <div class="item-wrapper" v-if="!usecode">
      <a-input-password v-model="password" placeholder="请输入密码" allow-clear size="large">
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </div>
    <div class="item-code">
      <a-input v-model="verificationCode" placeholder="请输入验证码" allow-clear size="large">
      </a-input>
      <div class="code-img" ref="codeimg" v-if="!usecode">
        <img :src="imagecode" class="image" @click="obtainVerificationCode" alt="网络失联了">
      </div>
      <div class="code-btn" v-else>
        <a-button :disabled="valid" :long="true" ref="sendmail" @click="sendemail" type="primary" size="large">
          <span v-if="valid">{{ settimer }}</span>
          <span v-else>发送验证码</span>
        </a-button>
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
    <div class="link-switch">
      <a-link :underline="false" @click="router.replace('/active')" type="primary">激活</a-link>
      <a-link :underline="false" @click="router.replace('/forgotpassword')" type="primary">忘记密码?</a-link>
    </div>
    <div class="link-btn">
      <a-link class="link" :underline="false" @click="usecode = true; usephone = reflect.phonelogin"
        v-show="usephone != reflect.phonelogin" type="primary">
        <template #icon>
          <svg t="1725961616295" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2524" width="32" height="32">
            <path
              d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
              p-id="2525" fill="#60ADFC"></path>
          </svg>
        </template>
        手机号登录
      </a-link>
      <a-link class="link" :underline="false"
        @click="usecode = false; usephone = reflect.passwordlogin; obtainVerificationCode()"
        v-show="usephone != reflect.passwordlogin" type="primary">
        <template #icon>
          <svg t="1725961795326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5636" width="32" height="32">
            <path
              d="M224 384h576A96 96 0 0 1 896 480v384a96 96 0 0 1-96 96h-576A96 96 0 0 1 128 864v-384A96 96 0 0 1 224 384z m0 64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32v-384a32 32 0 0 0-32-32h-576z m576-160a32 32 0 1 1-64 0 224 224 0 0 0-448 0 32 32 0 0 1-64 0 288 288 0 0 1 576 0z m-320 320a32 32 0 0 1 64 0v128a32 32 0 1 1-64 0v-128z"
              fill="#60ADFC" p-id="5637"></path>
          </svg>
        </template>
        密码登录
      </a-link>
      <a-link class="link" :underline="false" @click="usecode = true; usephone = reflect.emaillogin"
        v-show="usephone != reflect.emaillogin" type="primary">
        <template #icon>
          <svg t="1725961708112" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3713" width="32" height="32">
            <path
              d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z"
              fill="#60ADFC" p-id="3714"></path>
          </svg>
        </template>
        邮箱登录
      </a-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onUpdated, onBeforeMount, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { decoded } from '@/stores/types'
import { post, get } from '@/api/api'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/modules/user'
import { jwtDecode } from "jwt-decode";
import { useStorage, useWindowSize, useSessionStorage, useEventListener } from '@vueuse/core'
const reflect = {
  phonelogin: 0,
  emaillogin: 1,
  passwordlogin: 2
}
const { width } = useWindowSize()// 获取屏幕宽高
let number = ref<string>()
let password = ref<string>()// 密码
let verificationCode = ref<string>()// 验证码
let autoLogin = ref(true)// 是否自动登录
let loading = ref(false)// 登录加载
const router = useRouter()// 获取路由
const userStore = useUserStore()// 获取用户信息
let imagecode = ref()// 图片验证码
let codeimg = ref()// 图片验证码容器
const userinfo = computed(() => userStore.userinfo)
let usecode = ref(false)
let usephone = ref(reflect.phonelogin)
let valid = ref(false)
let settimer = ref(120)
let usernamePlaceholder = ref('请输入工号/邮箱/手机号')
let code = ref()
let loginkey = ref()// 验证码key

onBeforeMount(() => {
  obtainVerificationCode()// 获取验证码
})
onMounted(() => {
  routerto()
  if (usecode.value == false) {
    usephone.value = reflect.passwordlogin
  }
  useEventListener(window, 'keydown', (e) => {
    if (e.key === 'Enter') {
      handleEnter()
    }
  }, { passive: true });
})
const handleEnter = () => {
  if (usephone.value == reflect.passwordlogin) {
    onLogin()
  } else if (usephone.value == reflect.phonelogin) {
    if (number.value == "" || number.value == null || number.value == undefined) {
      Message.error('手机号不能为空')
    } else if (verificationCode.value == "" || verificationCode.value == null || verificationCode.value == undefined) {
      Message.error('验证码不能为空')
    } else {
      onLogin()
    }
  } else if (usephone.value == reflect.emaillogin) {
    if (number.value == "" || number.value == null || number.value == undefined) {
      Message.error('邮箱不能为空')
    } else if (verificationCode.value == "" || verificationCode.value == null || verificationCode.value == undefined) {
      Message.error('验证码不能为空')
    } else {
      onLogin()
    }
  }
};
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
  if (usecode.value == false) {
    codeimg.value.style.width = calculatewidth() + "px"
    usernamePlaceholder.value = '请输入工号/邮箱/手机号'
  } else if (usecode.value && usephone.value == reflect.phonelogin) {
    usernamePlaceholder.value = '请输入手机号'
  } else if (usecode.value && usephone.value == reflect.emaillogin) {
    usernamePlaceholder.value = '请输入邮箱'
  }
})
// 获取验证码
function obtainVerificationCode() {
  get("/captcha/image", {
    width: Math.round(calculatewidth()),
    height: 36
  },
  ).then((res: any) => {
    imagecode.value = res.data.value
    loginkey.value = res.data.key
  }).catch((e: any) => {
    Message.error(e.message)
  })
}
// 登录提交
const onLogin = async () => {
  loading.value = true //按钮请求状态
  // 表单验证
  if (usecode.value == false) {
    if (number.value == "" || number.value == undefined) {
      Message.error('用户名不能为空')
      loading.value = false
    } else if (password.value == "" || password.value == undefined) {
      Message.error('密码不能为空')
      loading.value = false
    } else if (password.value && password.value.length < 6) {
      Message.error('密码长度不能小于6位')
      loading.value = false
    } else if (verificationCode.value == undefined) {
      Message.error('请输入验证码')
      loading.value = false
    } else if (verificationCode.value.length != 4) {
      Message.error('验证码长度必须为4位')
      loading.value = false
    }
    else if (number.value != "" && password.value!.length >= 6 && verificationCode.value.length == 4) {
      login()
    } else {
      Message.error('未知错误')
      loading.value = false
    }
  } else {
    login()
  }

}
function routerto() {
  // 校验登录用户是否为有权限访问后台
  let index = userinfo.value.authorities.indexOf('ROLE_STUDENT')
  if (userStore.authorities[0] != '' && index == -1) {
    router
      .replace({
        path: "/background",
      })
      .then(() => {
        Message.success(userinfo.value.username + "欢迎回来")
      })
  }
}
function sendemail() {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pattern1 = /^1[3-9]\d{9}$/
  let phone;
  if (number.value != undefined) {
    valid.value = pattern.test(number.value)
    phone = pattern1.test(number.value)
  } else {
    valid.value = false
    Message.error('不能为空')
  }
  console.log(valid.value);
  if (!valid.value && !phone) {
    Message.error('请输入正确的格式')
  } else if (valid.value) {
    let timer = setInterval(function () {
      settimer.value--;
      if (settimer.value == 0) {
        clearInterval(timer)
        settimer.value = 120
      }
    }, 1000)
    get("/captcha/email", {}, {
      email: number.value
    }).then((res: any) => {
      loginkey.value = res.data.key
      code.value = res.data.value
      Message.success('验证码发送成功')
      console.log(res);
    })
  } else if (!phone) {
    Message.error('请输入正确的手机号格式')
  } else if (phone) {
    let timer = setInterval(function () {
      settimer.value--;
      if (settimer.value == 0) {
        clearInterval(timer)
        settimer.value = 120
      }
    }, 1000)
    get("/captcha/phone", {}, {
      phone: number.value
    }).then((res: any) => {
      loginkey.value = res.data.key
      code.value = res.data.value
      Message.success('验证码发送成功')
      console.log(res);
    })
  }
}
function login() {
  post(
    "/auth/login",
    {
      username: number.value,
      password: password.value,
      code: verificationCode.value,
      key: loginkey.value
    },
  )
    .then((res: any) => {
      // 后端校验有错重新获取验证码
      if (!res.success) {
        obtainVerificationCode()
        Message.error(res.message)
        loading.value = false
        // 请求无误 
      } else if (res.success) {
        let token;
        if (autoLogin.value == true) {
          token = useStorage("access_token", res.data.access_token)// 用户token保存到浏览器中的localstorage
        } else {
          token = useSessionStorage("access_token", res.data.access_token)// 用户token到浏览器中的session里
        }
        const decoded: decoded = jwtDecode(token.value)// 解码token
        console.log(decoded)
        userStore.saveToken(res.data.access_token, decoded)// 保存用户信息
        routerto()
      }
    })
    .catch((error) => {
      Message.error(error.message)
      loading.value = false
    })
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
  justify-content: space-evenly;

  .title {
    font-size: 1.5625rem;
    font-weight: bold;
    margin: 1.25rem 0;
    text-align: center;
  }

  .item-wrapper,
  .autologin {
    margin-bottom: .3125rem;
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

  .link-switch {
    display: flex;
    justify-content: space-between;
    margin-bottom: .3125rem;
  }

  .link-btn {
    display: flex;
    justify-content: space-around;
    margin-bottom: .3125rem;

    .link {
      flex-direction: column;
    }
  }

  .login {
    width: 100%;
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